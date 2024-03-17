import OtpInput from "~/components/common/OtpInput";
import PrimaryButton from "~/components/common/PrimaryButton";

type VerifyEmailFormProps = {
    className?: string;
}

const VerifyEmailForm:React.FC<VerifyEmailFormProps> = ({
    className
}) => {
    return (
        <div
            className={`border-[#C1C1C1] border-[1px] rounded-[20px] w-[600px] h-auto flex flex-col items-center pt-[40px] pb-[131px]
                        ${className ? className : ""}
            `}
        >
            <h3
                className="text-[#000] font-[600] text-[32px]"
            >Verify your email</h3>

            <h6 className="text-[#000] text-[16px] font-[400] mt-[13px]" >
                {`Enter the 8 digit code you have received on\n`}<span className="font-[500]" >swa***@gmail.com</span></h6>

            <OtpInput
                label="Code"
                numberOfDigits={8}
                className="mt-[46px]"
            />

            <PrimaryButton
                text="Verify"
                className="w-[87%] mt-[64px] spin-button-none"
            />
        </div>
    )
}

export default VerifyEmailForm;