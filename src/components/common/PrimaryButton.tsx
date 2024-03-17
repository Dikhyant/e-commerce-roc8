"use client"

import React from "react";

type PrimaryButtonProps = {
    text: string;
    type?: "submit" | "reset" | "button";
    className?: string;
    onClick?: ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
}

const PrimaryButton:React.FC<PrimaryButtonProps> = ({
    text,
    type,
    className,
    onClick,
}) => {
    return (
        <button
            type={type ? type : "button"}
            className={`w-full h-[56px] bg-[#000] rounded-[6px] text-[#fff] hover:cursor-pointer
                        ${className ? className : ""}
            `}
            onClick={(e) => {if(onClick) onClick(e);}}
        >
            {text ? text : ""}
        </button>
    )
}

export default PrimaryButton;