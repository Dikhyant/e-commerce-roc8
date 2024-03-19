import { NextPage } from "next";
import SignupForm from "~/components/common/SignupForm";

const Signup:NextPage = () => {
    return (
        <main
            className="bg-[#ffffff13] w-screen h-auto flex  justify-center pb-[33px]"
        >
            <SignupForm
                className="self-start"
            />
        </main>
    )
}

export default Signup;