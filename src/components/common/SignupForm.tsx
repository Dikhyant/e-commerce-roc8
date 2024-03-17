"use client"

import Link from "next/link";
import { FormEvent } from "react";
import PrimaryButton from "~/components/common/PrimaryButton";
import TextInput from "~/components/common/TextInput";

type SignupFormProps = {
    className?: string;
}

const SignupForm:React.FC<SignupFormProps> = ({
    className,
}) => {

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const response = await fetch("api/user/",{method: "POST"})
        console.log("response", response);
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
                />

                <TextInput
                    name="Email"
                    label="Email"
                    type="email"
                    rootContainerClassName="w-[100%] mt-[32px]"
                />

                <TextInput
                    name="Password"
                    label="Password"
                    type="password"
                    rootContainerClassName="w-[100%] mt-[32px]"
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