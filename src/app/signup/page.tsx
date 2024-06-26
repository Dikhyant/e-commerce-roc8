import { NextPage } from "next";
import SignupForm from "~/components/common/SignupForm";

const Signup: NextPage = () => {
  return (
    <main className="flex h-auto w-screen justify-center  bg-[#ffffff13] pb-[33px] pt-[40px]">
      <SignupForm className="h-[614px] w-[576px] self-start" />
    </main>
  );
};

export default Signup;
