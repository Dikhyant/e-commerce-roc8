"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import PrimaryButton from "~/components/common/PrimaryButton";
import TextInput from "~/components/common/TextInput";
import { localStorageKeys } from "~/constants/keys";
import { pageRoutes } from "~/constants/page-routes";
import { IUserLoginViaEmail } from "~/types/api.interface";
import { loginViaEmail } from "~/utils/api-requests/auth.requests";
import { cn } from "~/utils/misc";

interface LoginFormProps {
  className?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ className }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [disableSubmitButton, setDisableSubmitButton] =
    useState<boolean>(false);
  const [showSubmitButtonLoader, setShowSubmitButtonLoader] =
    useState<boolean>(false);
  const router = useRouter();

  function onEmailValueChange(email: string) {
    setEmail(email);
  }

  function onPassordValueChange(password: string) {
    setPassword(password);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setDisableSubmitButton(true);
    setShowSubmitButtonLoader(true);

    function enableSubmitButton() {
      setDisableSubmitButton(false);
      setShowSubmitButtonLoader(false);
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      alert("Please enter your email");
      enableSubmitButton();
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email");
      enableSubmitButton();
      return;
    }

    if (!password) {
      alert("Please enter your password");
      enableSubmitButton();
      return;
    }

    const lowerCaseRegex = /[a-z]/g;
    const upperCaseRegex = /[A-Z]/g;
    const digitCaseRegex = /[0-9]/g;

    const isAtleastEightCharLong: boolean = password.length >= 8 ? true : false;
    const hasAtleastOneLowerCaseLetter: boolean = lowerCaseRegex.test(password);
    const hasAtleastOneUpperCaseLetter: boolean = upperCaseRegex.test(password);
    const hasAtleastOneNumber: boolean = digitCaseRegex.test(password);

    if (
      !(
        isAtleastEightCharLong &&
        hasAtleastOneLowerCaseLetter &&
        hasAtleastOneUpperCaseLetter &&
        hasAtleastOneNumber
      )
    ) {
      alert(
        `
                    minimum characters 8 - ${isAtleastEightCharLong}\n
                    must have at least 1 lowercase letter - ${hasAtleastOneLowerCaseLetter}\n
                    must have at least 1 uppercase letter - ${hasAtleastOneUpperCaseLetter}\n
                    must have at least 1 digit - ${hasAtleastOneNumber}
                `,
      );
      enableSubmitButton();
      return;
    }

    try {
      const requestBody: IUserLoginViaEmail = {
        email: email,
        password: password,
      };

      const response = await loginViaEmail(requestBody);
      console.log("response", response);
      window.localStorage.setItem(localStorageKeys.userEmail, email);
      router.push(pageRoutes.markInterests);
    } catch (error: any) {
      console.error(error);
      if (error?.message) {
        alert(`${error?.message}`);
      }
    } finally {
      enableSubmitButton();
    }
  }

  return (
    <div
      className={cn(
        "flex h-auto w-[50vw] flex-col items-center rounded-[20px] border-[1px] border-[#C1C1C1] pb-[51px] pt-[40px] text-[2.222vw] max-sm:w-[70vw] max-[500px]:text-[5vw] max-[400px]:w-[80vw]",
        className,
      )}
    >
      <h3 className="text-[1em] font-[600] text-[#000]">Login</h3>

      <h4 className="mt-[36px] text-[0.75em] font-[400] text-[#000]">
        Welcome back to ECOMMERCE
      </h4>

      <h6 className="mt-[13px] text-[0.5em] font-[400] text-[#000]">
        The next gen business marketplace
      </h6>

      <form className="mt-[32px] w-[86%]" onSubmit={onSubmit}>
        <TextInput
          name="Email"
          label="Email"
          type="email"
          rootContainerClassName="w-[100%]"
          onChangeText={onEmailValueChange}
          labelClassName="text-[0.5em]"
          inputClassName="text-[0.5em] max-[500px]:h-[40px]"
        />

        <TextInput
          name="Password"
          label="Password"
          type="password"
          rootContainerClassName="w-[100%] mt-[32px]"
          onChangeText={onPassordValueChange}
          labelClassName="text-[0.5em]"
          inputClassName="text-[0.5em] max-[500px]:h-[40px]"
        />

        <PrimaryButton
          text="Login"
          type="submit"
          className="mt-[40px] w-[100%] text-[0.5em] max-[500px]:h-[40px]"
          disabled={disableSubmitButton}
          showLoader={showSubmitButtonLoader}
        />
      </form>

      <div className="mt-[29px] h-[1px] w-[86%] bg-[#C1C1C1]"></div>

      <div className="mt-[31px] text-[0.5em]">
        <span className="text-[16px] font-[400] text-[#333333]">
          Don’t have an Account?{" "}
        </span>
        <Link className="text-[16px] font-[500] text-[#000000]" href="/signup">
          SIGN UP
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
