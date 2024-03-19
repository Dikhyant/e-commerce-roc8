import Chevron from "../svg/Chevron";

type DiscountBarProps = {

}

const DiscountBar:React.FC<DiscountBarProps> = () => {
    return (
        <div className="w-full h-[36px] bg-[#F4F4F4] flex items-center justify-center" >
            <Chevron //left chevron
            />
            <label className="mx-[14px] text-[0.972vw] max-[500px]:text-[4vw] font-[500]" >Get 10% off on business sign up</label>
            <Chevron
                className="rotate-180" // right chevron
            />
        </div>
    )
}

export default DiscountBar;