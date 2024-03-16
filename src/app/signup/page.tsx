import SignupForm from "~/components/common/SignupForm";

type SignupProps = {

}

const Signup:React.FC<SignupProps> = () => {
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