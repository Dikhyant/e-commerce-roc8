import { NextPage } from "next";
import LoginForm from "~/components/common/LoginForm";

const Login: NextPage = () => {
  return (
    <main className="flex h-screen w-screen justify-center  bg-[#ffffff13] pt-[40px]">
      <LoginForm className="h-[614px] w-[576px] self-start" />
    </main>
  );
};

export default Login;
