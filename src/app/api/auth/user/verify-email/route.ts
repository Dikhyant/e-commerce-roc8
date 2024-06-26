import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { IUserVerifyViaEmail } from "~/types/api.interface";
import { IUser } from "~/types/entities";
import bcrypt from "bcrypt";
import { SERVER_MESSAGES } from "~/constants/server-messages";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const reqBody: IUserVerifyViaEmail =
      (await request.json()) as IUserVerifyViaEmail;
    const { email, otp } = reqBody;
    console.log(otp);

    let user: IUser = (await db.user.findFirst({
      where: { email: email },
    })) as IUser;

    if (!(user?.verificationOtp && user?.verificationOtpExpiry)) {
      return NextResponse.json(
        { error: SERVER_MESSAGES.INTERNAL_SERVER_ERROR },
        { status: 500 },
      );
    }

    const isOtpValid = await bcrypt.compare(otp, user.verificationOtp);

    if (!isOtpValid) {
      return NextResponse.json(
        { error: SERVER_MESSAGES.INVALID_OTP },
        { status: 400 },
      );
    }
    console.log(user);

    user = await db.user.update({
      where: { id: user.id },
      data: { isVerified: true },
    });

    //create token data
    const tokenData = {
      id: user.id,
      username: user.name,
      email: user.email,
    };
    //create token
    const token = jwt.sign(tokenData, process.env.USER_LOGIN_TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
