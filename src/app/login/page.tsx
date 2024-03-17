import { NextPage } from "next";
import LoginForm from "~/components/common/LoginForm";

const Login:NextPage = () => {
    return (
        <main
            className="bg-[#ffffff13] w-screen h-screen flex  justify-center"
        >
            <LoginForm
                className="self-center"
            />
        </main>
    )
}

export default Login;