import { NextPage } from "next";
import VerifyEmailForm from "~/components/VerifyEmailForm";

const VerifyEmail: NextPage = () => {
  return (
    <main className="flex h-screen w-screen justify-center  bg-[#ffffff13] pt-[40px]">
      <VerifyEmailForm className="self-start" />
    </main>
  );
};

export default VerifyEmail;
