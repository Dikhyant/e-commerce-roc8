"use client"

import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import PrimaryButton from "~/components/common/PrimaryButton";
import TextInput from "~/components/common/TextInput";
import { localStorageKeys } from "~/constants/keys";
import { IUserSignUpViaEmail } from "~/types/api.interface";

type SignupFormProps = {
    className?: string;
}

const SignupForm:React.FC<SignupFormProps> = ({
    className,
}) => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
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

        if(!name) {
            alert("Please enter your name");
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!email) {
            alert("Please enter your email");
            return;
        }

        if(!emailRegex.test(email)) {
            alert("Please enter a valid email");
            return;
        }

        if(!password) {
            alert("Please enter your password");
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
            return;
        }
        
        try {
            const requestBody:IUserSignUpViaEmail = {
                name: name,
                email: email,
                password: password
            };
    
            const response = await fetch("api/auth/user/signup-email",
                                        {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                                // 'Content-Type': 'application/x-www-form-urlencoded',
                                            },
                                            body: JSON.stringify(requestBody)
                                        })
            console.log("response", response);
            window.localStorage.setItem(localStorageKeys.userEmail, email);
            router.push("/verify-email");
        } catch (error: any) {
            console.error(error);
            if(error?.message) {
                alert(`${error?.message}`);
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
            >Create your account</h3>

            <form
                className={`w-[86%] mt-[32px]`}
                onSubmit={onSubmit}
            >
                <TextInput
                    name="Name"
                    label="Name"
                    rootContainerClassName="w-[100%]"
                    onChangeText={onNameValueChange}
                />

                <TextInput
                    name="Email"
                    label="Email"
                    type="email"
                    rootContainerClassName="w-[100%] mt-[32px]"
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
                    type="submit"
                    text="Create account"
                    className="w-[100%] mt-[40px]"
                />
            </form>

            <div className="mt-[48px]" >
                <span className="text-[#333333] text-[16px] font-[400]" >Have an Account? </span>
                <Link className="text-[#000000] text-[16px] font-[500]" href={"/login"} >LOGIN</Link>
            </div>
            
        </div>
    )
}

export default SignupForm;