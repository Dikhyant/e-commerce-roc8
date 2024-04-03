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
    <header
      className={cn(
        "flex h-[100px] w-full items-center bg-[#fff] px-[40px] text-[1.111vw]",
      )}
    >
      <h1 className={cn("text-[2em] font-[700] text-[#000]")}>ECOMMERCE</h1>

      <div className="grow"></div>

      {headerNavButtonsData && headerNavButtonsData?.length > 0 ? (
        headerNavButtonsData.map((item, index) => {
          return (
            <HeaderNavButton
              key={item?.href}
              label={item?.label}
              href={item?.href}
              className={cn(
                "text-[1em]",
                index < headerNavButtonsData.length - 1 ? "mr-[32px]" : "",
              )}
            />
          );
        })
      ) : (
        <></>
      )}

      <div className="grow"></div>

      <button className="mr-[32px]">
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
    </header>
  );
};

export default Header;
