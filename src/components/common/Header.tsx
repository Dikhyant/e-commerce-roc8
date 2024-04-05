import HeaderNavButton from "~/components/common/HeaderNavButton";
import SearchIcon from "public/assets/icons/common/search-icon.svg";
import ShoppingCartIcon from "public/assets/icons/common/shopping-cart-icon.svg";
import Image from "next/image";
import { cn } from "~/utils/misc";

interface HeaderProps {
  headerNavButtonsData?: HeaderNavButtonProps[];
}

type HeaderNavButtonProps = React.ComponentProps<typeof HeaderNavButton>;

const Header: React.FC<HeaderProps> = ({ headerNavButtonsData }) => {
  return (
    <header>
      <div className="flex items-center justify-end gap-x-[20px] px-[40px] py-[12px] text-[12px] font-[400] text-[#333333]">
        <button>Help</button>
        <button>Orders & Returns</button>
        <button>Hi, John</button>
      </div>
      <div className="flex w-full items-center justify-between bg-[#fff] px-[40px] pb-[18px] pt-[7px]">
        <h1 className={cn("text-[32px] font-[700] text-[#000]")}>ECOMMERCE</h1>

        <div className="hidden items-center gap-x-[32px] md:flex">
          {headerNavButtonsData && headerNavButtonsData?.length > 0 ? (
            headerNavButtonsData.map((item, index) => {
              return (
                <HeaderNavButton
                  key={item?.href}
                  label={item?.label}
                  href={item?.href}
                  className={cn("text-[16px] font-[600] text-[#000000]")}
                />
              );
            })
          ) : (
            <></>
          )}
        </div>

        <div className="flex gap-x-[32px]">
          <button>
            <Image src={SearchIcon} alt="search-icon" width={20} height={20} />
          </button>

          <button>
            <Image
              src={ShoppingCartIcon}
              alt="search-icon"
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
