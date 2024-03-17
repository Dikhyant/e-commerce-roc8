"use client"
import { HTMLInputTypeAttribute } from "react";

type TextInputProps = {
    label?: string;
    labelClassName?: string;
    rootContainerClassName?: string;
    inputClassName?: string;
    type?: HTMLInputTypeAttribute;
    name?: string;
    placeholder?: string;
}

const TextInput:React.FC<TextInputProps> = ({
    label,
    labelClassName,
    rootContainerClassName,
    inputClassName,
    type,
    name,
    placeholder,
}) => {
    return (
        <div
            className={`w-full 
                        ${rootContainerClassName ? rootContainerClassName : ""}
            `}
        >
            {
                label ? (
                    <h6
                        className={`text-[#000] font-[400] text-[16px]
                                    ${labelClassName ? labelClassName : ""}
                        `}
                    >{label}</h6>
                ) : (<></>)
            }
            <input
                className={`w-full h-[48px] border-[#C1C1C1] border-[1px] rounded-[6px] placeholder:text-[#848484] pl-[16px]
                            ${inputClassName ? inputClassName : ""}
                `}
                placeholder={ placeholder ? placeholder : "Enter"}
                type={type ? type : "text"}
                name={name ? name : ""}
            />
        </div>
    )
}

export default TextInput;