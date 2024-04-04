import { ICategorySelectionCheck } from "~/types/api.interface";
import Checkbox from "./common/Checkbox";
import Pagination from "./common/Pagination";
import SpinningLoader from "./svg/SpinningLoader";

interface MarkInterestsFormProps {
  className?: string;
  categoriesWithSelectionStatus?: ICategorySelectionCheck[];
  isLoadingCircleVisible?: boolean;
  totalPageCount?: number;
  onPageChange?: (page: number) => void;
  onCategoryCheckBoxChange?: (id: string, isChecked: boolean) => void;
}

const MarkInterestsForm: React.FC<MarkInterestsFormProps> = ({
  className,
  categoriesWithSelectionStatus,
  isLoadingCircleVisible,
  totalPageCount,
  onPageChange,
  onCategoryCheckBoxChange,
}) => {
  return (
    <div
      className={`flex h-auto w-[50vw] flex-col items-center rounded-[20px] border-[1px] border-[#C1C1C1] pb-[72px] pt-[40px] text-[2.222vw]
                        max-sm:w-[70vw] max-[500px]:text-[5vw] max-[400px]:w-[80vw]
                    ${className ? className : ""}
            `}
    >
      <h3 className="font-inter text-[32px] font-[600] leading-[38.73px] text-[#000]">
        Please mark your interests!
      </h3>

      <h6 className="mt-[13px] font-inter text-[16px] font-[400] leading-[26px] text-[#000]">
        We will keep you notified.
      </h6>

      <h5 className="ml-[60px] mt-[37px] self-start font-inter text-[20px] font-[500] leading-[26px] text-[#000]">
        My saved interests!
      </h5>

      <div className="relative ml-[60px] mt-[28px] flex w-[75%] flex-col items-start gap-y-[25px] self-start">
        {categoriesWithSelectionStatus?.map((item, index) => {
          return (
            <Checkbox
              key={item?.id}
              text={item?.name}
              isChecked={item?.selected}
              onChange={(checked) => {
                if (onCategoryCheckBoxChange) {
                  onCategoryCheckBoxChange(item?.id, checked);
                }
              }}
              textClassName="text-[16px]"
            />
          );
        })}
        {!!isLoadingCircleVisible ? (
          <div className="absolute z-[2px] flex h-full w-full items-center justify-center bg-[#e1e1e1d2]">
            <SpinningLoader
              // className="absolute self-center justify-self-center"
              width={50}
              height={50}
            />
          </div>
        ) : (
          <></>
        )}
      </div>

      <Pagination
        count={totalPageCount ? totalPageCount : 20}
        onPageChange={(page) => {
          if (onPageChange) {
            onPageChange(page);
          }
        }}
        className="ml-[60px] mt-[68px] self-start text-[0.625em]"
      />
    </div>
  );
};

export default MarkInterestsForm;
