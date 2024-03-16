import LoginForm from "~/components/common/LoginForm";

type LoginProps = {

}

const Login:React.FC<LoginProps> = () => {
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