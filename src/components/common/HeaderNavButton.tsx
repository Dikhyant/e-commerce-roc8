import Link from "next/link";

type HeaderNavButtonProps = {
    label: string;
    href: string;
    className?: string;
}

const HeaderNavButton:React.FC<HeaderNavButtonProps> = ({
    label,
    href,
    className,
}) => {
    return (
        <Link className={`text-[#000] font-[600] text-[13px]
                          ${className ? className : ""}
        `}  href={href} >{label}</Link>
    )
}

export default HeaderNavButton;