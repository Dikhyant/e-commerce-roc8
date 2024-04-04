import { NextPage } from "next";
import VerifyEmailForm from "~/components/VerifyEmailForm";

const VerifyEmail: NextPage = () => {
  return (
    <main className="flex h-screen w-screen justify-center  bg-[#ffffff13] pt-[40px]">
      <VerifyEmailForm className="h-[453px] w-[576px] self-start" />
    </main>
  );
};

export default VerifyEmail;
