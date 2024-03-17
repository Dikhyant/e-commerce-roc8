import { NextPage } from "next";
import MarkInterestsForm from "~/components/MarkInterestsForm";

const MarkInterests:NextPage = () => {
    return (
        <main
            className="bg-[#ffffff13] w-screen h-screen flex  justify-center"
        >
            <MarkInterestsForm
                className="self-start"
            />
        </main>
    )
}

export default MarkInterests;