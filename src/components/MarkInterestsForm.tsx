import Checkbox from "./common/Checkbox";

type MarkInterestsFormProps = {
    className?: string;
}

const MarkInterestsForm:React.FC<MarkInterestsFormProps> = ({
    className,
}) => {
    return (
        <div
            className={`border-[#C1C1C1] border-[1px] rounded-[20px] w-[600px] h-auto flex flex-col items-center pt-[40px] pb-[131px]
                    ${className ? className : ""}
            `}
        >
            <h3
                className="text-[#000] font-[600] font-inter text-[32px]"
            >Please mark your interests!</h3>

            <h6 className="text-[#000] text-[16px] font-[400] font-inter mt-[13px]" >We will keep you notified.</h6>

            <h5 className="text-[#000] text-[20px] font-[500] font-inter self-start ml-[60px] mt-[37px] " >My saved interests!</h5>

            <Checkbox text="Shoes" />
        </div>
    )
}

export default MarkInterestsForm;