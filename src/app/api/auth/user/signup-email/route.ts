import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { IUserSignUpViaEmail } from "~/types/api.interface";
import bcrypt from "bcrypt";
import { IUser } from "~/types/entities";
import { generateOTP } from "~/utils/random-generator";
import { sendVerificationOtp } from "~/utils/mailer";
import { SERVER_MESSAGES } from "~/constants/server-messages";

export async function POST(request: NextRequest) {
  try {
    const body: IUserSignUpViaEmail =
      (await request.json()) as IUserSignUpViaEmail;
    console.log("body", body);
    if (!body?.name || !body?.email || !body?.password) {
      throw new Error("Request body param missing");
    }

    const u = await db.user.findUnique({ where: { email: body.email } });
    if (u) {
      return NextResponse.json(
        { message: SERVER_MESSAGES.USER_ALREAD_EXISTS },
        { status: 403 },
      );
    }

    const saltRound = 12;
    const salt = await bcrypt.genSalt(saltRound);
    const passwordHash = await bcrypt.hash(body?.password, salt);
    const otp = generateOTP(8);
    const otpHash = await bcrypt.hash(otp, salt);
    const user: IUser = await db.user.create({
      data: {
        name: body?.name,
        email: body?.email,
        password: passwordHash,
        verificationOtp: otpHash,
        verificationOtpExpiry: (Date.now() + 1000 * 60 * 60 * 24).toString(),
      },
    });

    await sendVerificationOtp({
      email: user.email,
      otp,
    });

    return NextResponse.json({ user: user }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
