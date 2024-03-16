"use client"

import React from "react";

type PrimaryButtonProps = {
    text: string;
    className?: string;
}

const PrimaryButton:React.FC<PrimaryButtonProps> = ({
    text,
    className,
}) => {
    return (
        <button
            type="submit"
            className={`w-[300px] h-[56px] bg-[#000] rounded-[6px] text-[#fff] hover:cursor-pointer
                        ${className ? className : ""}
            `}
        >
            {text ? text : ""}
        </button>
    )
}

export default PrimaryButton;