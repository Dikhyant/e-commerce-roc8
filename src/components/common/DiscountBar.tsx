import Chevron from "../svg/Chevron";

interface DiscountBarProps {}

const DiscountBar: React.FC<DiscountBarProps> = () => {
  return (
    <div className="flex h-[36px] w-full items-center justify-center bg-[#F4F4F4]">
      <Chevron //left chevron
      />
      <label className="mx-[14px] text-[0.972vw] font-[500] max-[500px]:text-[4vw]">
        Get 10% off on business sign up
      </label>
      <Chevron
        className="rotate-180" // right chevron
      />
    </div>
  );
};

export default DiscountBar;
