import nodemailer from 'nodemailer';
import { generateOTP } from './random-generator';
import SMTPTransport from 'nodemailer/lib/smtp-transport';


export const sendVerificationOtp = async({email, otp}:{email: string, otp: string}):Promise<SMTPTransport.SentMessageInfo> => {
    try {
        const html = `<p>Here's your verification code: ${otp}</p>`
        const mailresponse = await sendEmail({
            email,
            html,
            subject: "Verification OTP"
        });

        return mailresponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
}

export async function sendEmail({email, html, subject}: {email: string; html: string; subject: string}): Promise<SMTPTransport.SentMessageInfo> {
    var transport = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST!,
        port: parseInt(process.env.MAILTRAP_PORT!),
        auth: {
            user: process.env.MAILTRAP_USER!,
            pass: process.env.MAILTRAP_PASS!
            //TODO: add these credentials to .env file
        }
    });
    
    const mailOptions = {
        from: process.env.MAILTRAP_SENDER_EMAIL!,
        to: email,
        subject: subject,
        html: html
    };

    const mailresponse = await transport.sendMail(mailOptions);

    return mailresponse
}