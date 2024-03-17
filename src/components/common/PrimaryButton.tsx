"use client"

import React from "react";
import SpinningLoader from "../svg/SpinningLoader";

type PrimaryButtonProps = {
    text: string;
    type?: "submit" | "reset" | "button";
    className?: string;
    disabled?: boolean;
    showLoader?: boolean;
    onClick?: ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
}

const PrimaryButton:React.FC<PrimaryButtonProps> = ({
    text,
    type,
    className,
    disabled,
    showLoader,
    onClick,
}) => {
    return (
        <button
            disabled={disabled}
            type={type ? type : "button"}
            className={`w-full h-[56px] rounded-[6px] text-[#fff] relative flex items-center justify-center
                        ${disabled ? "bg-[#626262]" : "bg-[#000]"}
                        ${className ? className : ""}
            `}
            onClick={(e) => {if(onClick) onClick(e);}}
        >
            {text ? text : ""}
            {
                showLoader ? (
                    <SpinningLoader width={30} height={30} className="absolute right-[5%]" />
                ) : (<></>)
            }
        </button>
    )
}

export default PrimaryButton;