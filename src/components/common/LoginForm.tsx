"use client"

import Link from "next/link";
import PrimaryButton from "~/components/common/PrimaryButton";
import TextInput from "~/components/common/TextInput";

type LoginFormProps = {
    className?: string;
}

const LoginForm:React.FC<LoginFormProps> = ({
    className,
}) => {
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
            >

                <TextInput
                    name="Email"
                    label="Email"
                    type="email"
                    rootContainerClassName="w-[100%]"
                />

                <TextInput
                    name="Password"
                    label="Password"
                    type="password"
                    rootContainerClassName="w-[100%] mt-[32px]"
                />

                <PrimaryButton
                    text="Login"
                    className="w-[100%] mt-[40px]"
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