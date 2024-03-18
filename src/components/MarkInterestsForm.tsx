import { ICategorySelectionCheck } from "~/types/api.interface";
import Checkbox from "./common/Checkbox";
import Pagination from "./common/Pagination";
import SpinningLoader from "./svg/SpinningLoader";

type MarkInterestsFormProps = {
    className?: string;
    categoriesWithSelectionStatus?: ICategorySelectionCheck[];
    showLoadingCircle?: boolean;
    totalPageCount?: number;
    onPageChange?: ((page: number) => void);
}

const MarkInterestsForm:React.FC<MarkInterestsFormProps> = ({
    className,
    categoriesWithSelectionStatus,
    showLoadingCircle,
    totalPageCount,
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

            <div className="flex flex-col items-start gap-y-[25px] self-start w-[75%] ml-[60px] mt-[28px] relative" >
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
            {
                showLoadingCircle ? (
                    <div className="absolute w-full h-full bg-[#e1e1e1d2] z-[2px] flex items-center justify-center" >
                        <SpinningLoader
                            // className="absolute self-center justify-self-center"
                            width={50}
                            height={50}
                        />
                    </div>
                ) : (<></>)
            }
            </div>

            <Pagination 
                count={totalPageCount ? totalPageCount : 20} 
                onPageChange={(page) => {
                    if(onPageChange) {
                        onPageChange(page);
                    }
                }} 
                className="mt-[68px] self-start ml-[60px]"
            />
        </div>
    )
}

export default MarkInterestsForm;