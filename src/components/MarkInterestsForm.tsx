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
    onCategoryCheckBoxChange?: ((id: string, checked: boolean) => void);
}

const MarkInterestsForm:React.FC<MarkInterestsFormProps> = ({
    className,
    categoriesWithSelectionStatus,
    showLoadingCircle,
    totalPageCount,
    onPageChange,
    onCategoryCheckBoxChange,
}) => {
    return (
        <div
            className={`border-[#C1C1C1] border-[1px] rounded-[20px] text-[2.222vw] max-[500px]:text-[5vw] h-auto flex flex-col items-center pt-[40px] pb-[131px]
                        max-[400px]:w-[80vw] max-sm:w-[70vw] w-[50vw]
                    ${className ? className : ""}
            `}
        >
            <h3
                className="text-[#000] font-[600] font-inter text-[1em]"
            >Please mark your interests!</h3>

            <h6 className="text-[#000] text-[0.5em] font-[400] font-inter mt-[13px]" >We will keep you notified.</h6>

            <h5 className="text-[#000] text-[0.625em] font-[500] font-inter self-start ml-[60px] mt-[37px] " >My saved interests!</h5>

            <div className="flex flex-col items-start gap-y-[25px] self-start w-[75%] ml-[60px] mt-[28px] relative" >
            {
                categoriesWithSelectionStatus && categoriesWithSelectionStatus?.map((item, index) => {
                    return (
                        <Checkbox
                            key={item?.id}
                            text={item?.name}
                            checked={item?.selected}
                            onChange={(checked) => {
                                if(onCategoryCheckBoxChange) {
                                    onCategoryCheckBoxChange(item?.id, checked);
                                }
                            }}
                            textClassName="text-[0.5em]"
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
                className="mt-[68px] self-start ml-[60px] text-[0.625em]"
            />
        </div>
    )
}

export default MarkInterestsForm;