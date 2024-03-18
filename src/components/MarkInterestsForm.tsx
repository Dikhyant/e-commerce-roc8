import { ICategorySelectionCheck } from "~/types/api.interface";
import Checkbox from "./common/Checkbox";
import Pagination from "./common/Pagination";

type MarkInterestsFormProps = {
    className?: string;
    categoriesWithSelectionStatus?: ICategorySelectionCheck[];
    onPageChange?: ((page: number) => void);
}

const MarkInterestsForm:React.FC<MarkInterestsFormProps> = ({
    className,
    categoriesWithSelectionStatus,
    onPageChange,
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

            <div className="flex flex-col gap-y-[12px]" >
            {
                categoriesWithSelectionStatus && categoriesWithSelectionStatus?.map((item, index) => {
                    return (
                        <Checkbox
                            key={item?.id}
                            text={item?.name}
                            checked={item?.selected}
                        />
                    )
                })
            }
            </div>

            <Pagination 
                count={20} 
                onPageChange={(page) => {
                    if(onPageChange) {
                        onPageChange(page);
                    }
                }} 
                className="mt-[20px]"
            />
        </div>
    )
}

export default MarkInterestsForm;