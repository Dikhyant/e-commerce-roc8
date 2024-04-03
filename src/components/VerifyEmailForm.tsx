"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import OtpInput from "~/components/common/OtpInput";
import PrimaryButton from "~/components/common/PrimaryButton";
import { localStorageKeys } from "~/constants/keys";
import { pageRoutes } from "~/constants/page-routes";
import { verifyEmail } from "~/utils/api-requests/auth.requests";
import { partiallyHideEmail } from "~/utils/common";
import { ApiResponseError } from "~/utils/http";

interface VerifyEmailFormProps {
  className?: string;
}

const otpLength = 8;

const VerifyEmailForm: React.FC<VerifyEmailFormProps> = ({ className }) => {
  const [otp, setOtp] = useState<string>("");
  const [disableSubmitButton, setDisableSubmitButton] =
    useState<boolean>(false);
  const [showSubmitButtonLoader, setShowSubmitButtonLoader] =
    useState<boolean>(false);
  const [email, setEmail] = useState<string>("xiveh53023@darkse.com");
  const router = useRouter();

  useEffect(() => {
    const email = window.localStorage.getItem(
      localStorageKeys.userEmail,
    )!;
    if (email) {
      setEmail(email);
    }
  }, []);

  function onOtpChange(otp: string) {
    setOtp(otp);
  }

  async function handleOtpSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDisableSubmitButton(true);
    setShowSubmitButtonLoader(true);

    if (otp.length < otpLength) {
      alert("Please enter the complete otp");
      setDisableSubmitButton(false);
      setShowSubmitButtonLoader(false);
      return;
    }

    // const email = window.localStorage.getItem(localStorageKeys.userEmail) as string

    try {
      const response = await verifyEmail({
        email: email,
        otp: otp,
      });
      console.log("response", response);
      router.push(pageRoutes.markInterests);
    } catch (error) {
      console.error(error);
      if ((error as ApiResponseError)?.message) {
        alert((error as ApiResponseError).message);
      }
    } finally {
      setDisableSubmitButton(false);
      setShowSubmitButtonLoader(false);
    }
  }

  return (
    <div
      className={`flex h-auto w-[50vw] flex-col items-center rounded-[20px] border-[1px] border-[#C1C1C1] pb-[131px] pt-[40px] text-[2.222vw]
                        max-sm:w-[70vw] max-[500px]:text-[5vw] max-[400px]:w-[80vw]
                        ${className ? className : ""}
            `}
    >
      <h3 className="text-[1em] font-[600] text-[#000]">Verify your email</h3>

      <h6 className="mt-[13px] w-auto self-center text-center text-[0.5em] font-[400] text-[#000]">
        {`Enter the 8 digit code you have received on`}
        <br />
        <span className="font-[500]">{partiallyHideEmail(email)}</span>
      </h6>

      <form onSubmit={handleOtpSubmit}>
        <OtpInput
          label="Code"
          numberOfDigits={otpLength}
          className="mt-[46px]"
          labelClassName="!text-[0.5em]"
          inputBlockClassName="!aspect-[46/48] !w-[3.194vw] max-[500px]:!w-[20px]"
          onChangeOtp={onOtpChange}
        />

        <PrimaryButton
          type="submit"
          text="Verify"
          className="spin-button-none mt-[64px] w-[87%] text-[0.5em] max-[500px]:h-[40px]"
          disabled={disableSubmitButton}
          showLoader={showSubmitButtonLoader}
        />
      </form>
    </div>
  );
};

export default VerifyEmailForm;
