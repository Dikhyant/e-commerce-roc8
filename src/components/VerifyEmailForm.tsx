"use client"

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import OtpInput from "~/components/common/OtpInput";
import PrimaryButton from "~/components/common/PrimaryButton";
import { localStorageKeys } from "~/constants/keys";
import { pageRoutes } from "~/constants/page-routes";
import { verifyEmail } from "~/utils/api-requests/auth.requests";
import { ApiResponseError } from "~/utils/http";

type VerifyEmailFormProps = {
    className?: string;
}

const otpLength = 8;

const VerifyEmailForm:React.FC<VerifyEmailFormProps> = ({
    className
}) => {
    const [otp, setOtp] = useState<string>("");
    const router = useRouter();

    function onOtpChange(otp: string) {
        setOtp(otp);
    }

    async function handleOtpSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if(otp.length < otpLength) {
            alert("Please enter the complete otp");
            return;
        }

        const email = window.localStorage.getItem(localStorageKeys.userEmail) as string

        try {
            const response = await verifyEmail({
                email: email,
                otp: otp
            });
            console.log("response", response);
            router.push(pageRoutes.markInterests);
        } catch (error) {
            console.error(error);
            if((error as ApiResponseError)?.message) {
                alert((error as ApiResponseError).message);
            }
        }

        
    }
    return (
        <div
            className={`border-[#C1C1C1] border-[1px] rounded-[20px] w-[600px] h-auto flex flex-col items-center pt-[40px] pb-[131px]
                        ${className ? className : ""}
            `}
        >
            <h3
                className="text-[#000] font-[600] text-[32px]"
            >Verify your email</h3>

            <h6 className="text-[#000] text-[16px] font-[400] mt-[13px]" >
                {`Enter the 8 digit code you have received on\n`}<span className="font-[500]" >swa***@gmail.com</span></h6>

            <form
                onSubmit={handleOtpSubmit}
            >
                <OtpInput
                    label="Code"
                    numberOfDigits={otpLength}
                    className="mt-[46px]"
                    onChangeOtp={onOtpChange}
                />

                <PrimaryButton
                    type="submit"
                    text="Verify"
                    className="w-[87%] mt-[64px] spin-button-none"
                />
            </form>
            

            
        </div>
    )
}

export default VerifyEmailForm;