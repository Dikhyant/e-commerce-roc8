import { NextPage } from "next";
import VerifyEmailForm from "~/components/VerifyEmailForm";

const VerifyEmail:NextPage = () => {
    return (
        <main
            className="bg-[#ffffff13] w-screen h-screen flex  justify-center"
        >
            <VerifyEmailForm
            />
        </main>
    )
}

export default VerifyEmail;