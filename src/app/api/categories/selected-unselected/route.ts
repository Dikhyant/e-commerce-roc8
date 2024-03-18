import { NextRequest, NextResponse } from "next/server";
import { dbConstants } from "~/constants/db";
import { db } from "~/server/db";
import { ApiResponse, ICategorySelectionCheck, IAlterCategories_SelectionStatus } from "~/types/api.interface";
import { AuthTokenData } from "~/types/common";
import { IUserCategory_Selection_Status } from "~/types/entities";
import { ApiResponseError } from "~/utils/http";
import { getDecodedJWTToken } from "~/utils/token";

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value || '';
        const decodedToken: AuthTokenData = getDecodedJWTToken<AuthTokenData>(token);
        const url = request.url;
        const queryString = url.split('?')[1];
        let params:any = {};
        if (queryString) {
            queryString.split('&').forEach((param) => {
                const [key, value] = param.split('=');
                if(key && value)
                    params[key] = decodeURIComponent(value);
            });
        }

        let limit = parseInt(params?.limit ? params.limit : 20);
        let offset = params?.page ? (parseInt(params.page) - 1) * limit : 0;
        let userId = decodedToken?.id ? decodedToken.id : "";

        const result:IUserCategory_Selection_Status[] = await db.$queryRaw`
            SELECT 
                c.id AS category_id,
                c.name AS category_name,
                CASE 
                    WHEN uc.user_id IS NULL THEN ${dbConstants.NOT_SELECTED}
                    ELSE ${dbConstants.SELECTED}
                END AS selection_status
            FROM 
                "Category" c
            LEFT JOIN 
                "UserCategory" uc ON c.id = uc.category_id AND uc.user_id = ${userId}
            ORDER BY c.id
            LIMIT ${limit}
            OFFSET ${offset};
        `

        const formattedResult:ICategorySelectionCheck[] = []

        for(let i = 0; i < result?.length; i++) {
            formattedResult.push({
                id: result[i]?.category_id as string,
                name: result[i]?.category_name as string,
                selected: result[i]?.selection_status === dbConstants.SELECTED,
            })
        }

        const responseData:ApiResponse<ICategorySelectionCheck[]> = {
            data: formattedResult,
            message: "Successfully found selected and unselected categories"
        } 

        console.log("result", result);
        return NextResponse.json(responseData);
    } catch (error) {
        const errorResponse = {
            message: error,
            code: 400
        }
        return NextResponse.json(errorResponse)
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const body:IAlterCategories_SelectionStatus = await request.json();
        if(!(body?.categories && body?.categories?.length > 0)) {
            throw new Error("No category was provided");
        }

        const token = request.cookies.get("token")?.value || '';
        const decodedToken: AuthTokenData = getDecodedJWTToken<AuthTokenData>(token);
        const userId = decodedToken?.id ? decodedToken?.id : "";
        const addEntries = await db.userCategory.createMany({
            data: body.categories.filter(item => item.selected).map(item => ({category_id: item.id, user_id: userId}))
        })

        const deletedEntries = await db.userCategory.deleteMany({
            where: {
                AND: [
                {
                    user_id: userId
                },
                {
                    category_id: {
                    in: body.categories.filter(item => !item.selected).map(item => item.id)
                    }
                }
                ]
            }
        });

        const responseData:ApiResponse<any> = {
            data: {
                addEntries,
                deletedEntries
            },
            message: "Succesfully changed selection state of categories"
        }

        return NextResponse.json(responseData)
    } catch (error) {
        return NextResponse.json({
            message: error,
            code: 400
        })
    }
}