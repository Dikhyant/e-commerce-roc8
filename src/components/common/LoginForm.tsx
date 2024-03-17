"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import PrimaryButton from "~/components/common/PrimaryButton";
import TextInput from "~/components/common/TextInput";
import { localStorageKeys } from "~/constants/keys";
import { pageRoutes } from "~/constants/page-routes";
import { IUserLoginViaEmail } from "~/types/api.interface";
import { loginViaEmail } from "~/utils/api-requests/auth.requests";

type LoginFormProps = {
    className?: string;
}

const LoginForm:React.FC<LoginFormProps> = ({
    className,
}) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [disableSubmitButton, setDisableSubmitButton] = useState<boolean>(false);
    const [showSubmitButtonLoader, setShowSubmitButtonLoader] = useState<boolean>(false);
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
        if(!email) {
            alert("Please enter your email");
            enableSubmitButton();
            return;
        }

        if(!emailRegex.test(email)) {
            alert("Please enter a valid email");
            enableSubmitButton();
            return;
        }

        if(!password) {
            alert("Please enter your password");
            enableSubmitButton();
            return;
        }

        const lowerCaseRegex = /[a-z]/g;
        const upperCaseRegex = /[A-Z]/g;
        const digitCaseRegex = /[0-9]/g;

        let isAtleastEightCharLong:boolean = password.length >= 8 ? true : false;
        let hasAtleastOneLowerCaseLetter:boolean = lowerCaseRegex.test(password);
        let hasAtleastOneUpperCaseLetter:boolean = upperCaseRegex.test(password);
        let hasAtleastOneNumber:boolean = digitCaseRegex.test(password);

        if(!(
            isAtleastEightCharLong &&
            hasAtleastOneLowerCaseLetter &&
            hasAtleastOneUpperCaseLetter &&
            hasAtleastOneNumber
        )) {
            alert(
                `
                    minimum characters 8 - ${isAtleastEightCharLong}\n
                    must have at least 1 lowercase letter - ${hasAtleastOneLowerCaseLetter}\n
                    must have at least 1 uppercase letter - ${hasAtleastOneUpperCaseLetter}\n
                    must have at least 1 digit - ${hasAtleastOneNumber}
                `
            );
            enableSubmitButton();
            return;
        }
        
        try {
            const requestBody:IUserLoginViaEmail = {
                email: email,
                password: password
            };
    
            const response = await loginViaEmail(requestBody);
            console.log("response", response);
            window.localStorage.setItem(localStorageKeys.userEmail, email);
            router.push(pageRoutes.markInterests);
        } catch (error: any) {
            console.error(error);
            if(error?.message) {
                alert(`${error?.message}`);
            }
            
        } finally {
            enableSubmitButton();
        }

        

        
    }
    
    return (
        <div
            className={`border-[#C1C1C1] border-[1px] rounded-[20px] w-[600px] h-auto flex flex-col items-center pt-[40px] pb-[51px]
                        ${className ? className : ""}
            `}
        >
            <h3
                className="text-[#000] font-[600] text-[32px]"
            >Login</h3>

            <h4 className="text-[#000] text-[24px] font-[400] mt-[36px]" >Welcome back to ECOMMERCE</h4>

            <h6 className="text-[#000] text-[16px] font-[400] mt-[13px]" >The next gen business marketplace</h6>

            <form
                className={`w-[86%] mt-[32px]`}
                onSubmit={onSubmit}
            >

                <TextInput
                    name="Email"
                    label="Email"
                    type="email"
                    rootContainerClassName="w-[100%]"
                    onChangeText={onEmailValueChange}
                />

                <TextInput
                    name="Password"
                    label="Password"
                    type="password"
                    rootContainerClassName="w-[100%] mt-[32px]"
                    onChangeText={onPassordValueChange}
                />

                <PrimaryButton
                    text="Login"
                    type="submit"
                    className="w-[100%] mt-[40px]"
                    disabled={disableSubmitButton}
                    showLoader={showSubmitButtonLoader}
                />
            </form>

            <div className="bg-[#C1C1C1] w-[86%] h-[1px] mt-[29px]" ></div>

            <div className="mt-[31px]" >
                <span className="text-[#333333] text-[16px] font-[400]" >Don’t have an Account? </span>
                <Link className="text-[#000000] text-[16px] font-[500]" href="/signup" >SIGN UP</Link>
            </div>
            
        </div>
    )
}

export default LoginForm;