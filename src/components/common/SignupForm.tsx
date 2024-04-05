"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import PrimaryButton from "~/components/common/PrimaryButton";
import TextInput from "~/components/common/TextInput";
import { localStorageKeys } from "~/constants/keys";
import { IUserSignUpViaEmail } from "~/types/api.interface";
import { signupViaEmail } from "~/utils/api-requests/auth.requests";
import { cn } from "~/utils/misc";

interface SignupFormProps {
  className?: string;
}

const SignupForm: React.FC<SignupFormProps> = ({ className }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] =
    useState<boolean>(false);
  const [isSubmitButtonLoaderVisible, setIsSubmitButtonLoaderVisible] =
    useState<boolean>(false);
  const router = useRouter();

  function onNameValueChange(name: string) {
    setName(name);
  }

  function onEmailValueChange(email: string) {
    setEmail(email);
  }

  function onPassordValueChange(password: string) {
    setPassword(password);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsSubmitButtonDisabled(true);
    setIsSubmitButtonLoaderVisible(true);

    function enableSubmitButton() {
      setIsSubmitButtonDisabled(false);
      setIsSubmitButtonLoaderVisible(false);
    }

    if (!name) {
      alert("Please enter your name");
      enableSubmitButton();
      return;
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
      const requestBody: IUserSignUpViaEmail = {
        name: name,
        email: email,
        password: password,
      };

      const response = await signupViaEmail(requestBody);
      console.log("response", response);
      window.localStorage.setItem(localStorageKeys.userEmail, email);
      router.push("/verify-email");
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
        "flex h-auto w-[50vw] flex-col items-center rounded-[20px] border-[1px] border-[#C1C1C1] pb-[131px] pt-[40px] text-[2.222vw] max-sm:w-[70vw] max-[500px]:pb-[50px] max-[500px]:text-[5vw] max-[400px]:w-[80vw]",
        className,
      )}
    >
      <h3 className="text-[32px] font-[600] text-[#000] max-sm:text-[24px]">
        Create your account
      </h3>

      <form className="mt-[32px] max-sm:w-11/12" onSubmit={onSubmit}>
        <TextInput
          name="Name"
          label="Name"
          rootContainerClassName="w-[456px] max-sm:w-full"
          onChangeText={onNameValueChange}
          inputClassName="h-[48px] "
        />

        <TextInput
          name="Email"
          label="Email"
          type="email"
          rootContainerClassName="w-[456px] max-sm:w-full mt-[32px]"
          onChangeText={onEmailValueChange}
          inputClassName="h-[48px] "
        />

        <TextInput
          name="Password"
          label="Password"
          type="password"
          rootContainerClassName="w-[456px] max-sm:w-full mt-[32px]"
          onChangeText={onPassordValueChange}
          inputClassName="h-[48px] "
        />

        <PrimaryButton
          type="submit"
          text="CREATE ACCOUNT"
          className="mt-[40px] w-[456px] text-[16px] max-sm:w-full"
          isDisabled={!!isSubmitButtonDisabled}
          isLoaderVisible={!!isSubmitButtonLoaderVisible}
        />
      </form>

      <div className="mt-[48px] text-[16px]">
        <span className="font-[400] text-[#333333]">Have an Account? </span>
        <Link className="ml-[11px] font-[500] text-[#000000]" href={"/login"}>
          LOGIN
        </Link>
      </div>
    </div>
  );
};

export default SignupForm;
