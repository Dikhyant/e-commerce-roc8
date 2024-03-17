import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { IUserVerifyViaEmail } from "~/types/api.interface";
import { IUser } from "~/types/entities";
import bcrypt from "bcrypt";
import { SERVER_MESSAGES } from "~/constants/server-messages";

export async function POST(request: NextRequest){

    try {
        const reqBody:IUserVerifyViaEmail = await request.json()
        const { 
            email,
            otp
        } = reqBody
        console.log(otp);

        const user:IUser = await db.user.findFirst({where: {email: email}}) as IUser;

        if(!(user?.verificationOtp && user?.verificationOtpExpiry)) {
            return NextResponse.json({error: SERVER_MESSAGES.INTERNAL_SERVER_ERROR}, {status: 500})
        }

        const isOtpValid = await bcrypt.compare(otp, user.verificationOtp);

        if (!isOtpValid) {
            return NextResponse.json({error: SERVER_MESSAGES.INVALID_OTP}, {status: 400})
        }
        console.log(user);

        await db.user.update({where: {id: user.id}, data: {isVerified: true}})
        
        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        })


    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}