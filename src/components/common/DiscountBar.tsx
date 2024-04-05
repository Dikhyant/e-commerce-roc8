import Chevron from "../svg/Chevron";
import { cn } from "~/utils/misc";

const DiscountBar: React.FC = () => {
  return (
    <div
      className={cn(
        "flex h-[36px] w-full items-center justify-center bg-[#F4F4F4]",
      )}
    >
      <Chevron //left chevron
      />
      <div className={cn("ml-[24px] mr-[20px] text-[14px] font-[500]")}>
        Get 10% off on business sign up
      </div>
      <Chevron
        className={cn("rotate-180")} // right chevron
      />
    </div>
  );
};

export default DiscountBar;
