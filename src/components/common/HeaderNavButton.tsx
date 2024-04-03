import Link from "next/link";

interface HeaderNavButtonProps {
  label: string;
  href: string;
  className?: string;
}

const HeaderNavButton: React.FC<HeaderNavButtonProps> = ({
  label,
  href,
  className,
}) => {
  return (
    <Link
      className={`text-[13px] font-[600] text-[#000]
                          ${className ? className : ""}
        `}
      href={href}
    >
      {label}
    </Link>
  );
};

export default HeaderNavButton;
