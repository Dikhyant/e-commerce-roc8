import { NextRequest, NextResponse } from "next/server";
import { dbConstants } from "~/constants/db";
import { db } from "~/server/db";
import {
  ApiResponse,
  IAlterCategories_SelectionStatus,
  ICategorySelectionCheck,
} from "~/types/api.interface";
import { AuthTokenData } from "~/types/common";
import { IUserCategory_Selection_Status } from "~/types/entities";
import { getDecodedJWTToken } from "~/utils/token";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value ?? "";
    const decodedToken: AuthTokenData =
      getDecodedJWTToken<AuthTokenData>(token);
    const url = request.url;
    const queryString = url.split("?")[1];
    const params: { limit: string; page: string } = { limit: "10", page: "1" };
    if (queryString) {
      queryString.split("&").forEach((param) => {
        const [key, value] = param.split("=");
        if (key == "limit" && value) {
          params.limit = decodeURIComponent(value);
          return;
        }
        if (key == "page" && value) {
          params.page = decodeURIComponent(value);
          return;
        }
      });
    }

    const limit: number = params?.limit ? parseInt(params.limit) : 20;
    const offset = params?.page ? (parseInt(params.page) - 1) * limit : 0;
    const userId = decodedToken?.id ? decodedToken.id : "";

    const result: IUserCategory_Selection_Status[] = await db.$queryRaw`
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
        `;

    const formattedResult: ICategorySelectionCheck[] = [];

    for (let i = 0; i < result?.length; i++) {
      formattedResult.push({
        id: result[i]?.category_id!,
        name: result[i]?.category_name!,
        selected: result[i]?.selection_status === dbConstants.SELECTED,
      });
    }

    const responseData: ApiResponse<ICategorySelectionCheck[]> = {
      data: formattedResult,
      message: "Successfully found selected and unselected categories",
    };

    console.log("result", result);
    return NextResponse.json(responseData);
  } catch (error) {
    const errorResponse = {
      message: error,
      code: 400,
    };
    return NextResponse.json(errorResponse);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body: IAlterCategories_SelectionStatus =
      (await request.json()) as IAlterCategories_SelectionStatus;
    if (!(body?.categories && body?.categories?.length > 0)) {
      throw new Error("No category was provided");
    }

    const token = request.cookies.get("token")?.value ?? "";
    const decodedToken: AuthTokenData =
      getDecodedJWTToken<AuthTokenData>(token);
    const userId = decodedToken?.id ? decodedToken?.id : "";
    await db.userCategory.createMany({
      data: body.categories
        .filter((item) => item.selected)
        .map((item) => ({ category_id: item.id, user_id: userId })),
    });

    const categoryIdsToDelete = body.categories
      .filter((item) => !item.selected)
      .map((item) => item.id);
    const formattedArrayOfCategoriestToBeDeleted = categoryIdsToDelete.map(
      (item) => `\'${item}\'`,
    );

    if (formattedArrayOfCategoriestToBeDeleted.length > 0) {
      await db.$queryRawUnsafe(`
                DELETE FROM "UserCategory"
                WHERE (user_id, category_id) IN (
                    SELECT \'${userId}\' AS user_id, unnest(ARRAY[${formattedArrayOfCategoriestToBeDeleted}]) AS category_id
                )
            `);
    }

    const responseData: ApiResponse<string> = {
      data: "Done",
      message: "Succesfully changed selection state of categories",
    };

    return NextResponse.json(responseData);
  } catch (error) {
    return NextResponse.json(
      {
        message: error,
        code: 400,
      },
      { status: 400 },
    );
  }
}
