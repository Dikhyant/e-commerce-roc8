import { NextPage } from "next";
import SignupForm from "~/components/common/SignupForm";

const Signup:NextPage = () => {
    return (
        <main
            className="bg-[#ffffff13] w-screen h-screen flex  justify-center"
        >
            <SignupForm
                className="self-center"
            />
        </main>
    )
}

export default Signup;