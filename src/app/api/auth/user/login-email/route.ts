import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { IUserLoginViaEmail } from "~/types/api.interface";
import { IUser } from "~/types/entities";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SERVER_MESSAGES } from "~/constants/server-messages";

export async function POST(request: NextRequest) {
  try {
    const reqBody: IUserLoginViaEmail =
      (await request.json()) as IUserLoginViaEmail;
    const { email, password } = reqBody;
    console.log(reqBody);

    //check if user exists
    const user: IUser = (await db.user.findFirst({
      where: { email: email },
    })) as IUser;
    if (!user) {
      return NextResponse.json(
        { error: SERVER_MESSAGES.USER_NOT_FOUND },
        { status: 400 },
      );
    }
    console.log("user exists");

    if (!user.isVerified) {
      return NextResponse.json(
        { error: SERVER_MESSAGES.USER_NOT_VERIFIED },
        { status: 400 },
      );
    }

    //check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: SERVER_MESSAGES.INVALID_PASSWORD },
        { status: 401 },
      );
    }
    console.log(user);

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
      message: "Login successful",
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
