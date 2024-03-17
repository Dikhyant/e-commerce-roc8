import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { IUserSignUpViaEmail } from "~/types/api.interface";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest, response: NextResponse) {
    
    try {
        const body: IUserSignUpViaEmail = await request.json();
        if(
            !body?.name ||
            !body?.email ||
            !body?.password 
        ) {
            throw new Error("Request body param missing");
        }
        const saltRound = 12;
        const salt = await bcrypt.genSalt(saltRound);
        const passwordHash = await bcrypt.hash(body?.password, salt);
        const user = await db.user.create({
            data: {
                name: body?.name,
                email: body?.email,
                password: passwordHash,
            }
        });
        return NextResponse.json({user: user})
    } catch (error) {
        console.error(error);
    }
}