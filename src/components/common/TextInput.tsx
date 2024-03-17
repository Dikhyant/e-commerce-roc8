"use client"
import { ChangeEvent, HTMLInputTypeAttribute, useState } from "react";

type TextInputProps = {
    label?: string;
    labelClassName?: string;
    rootContainerClassName?: string;
    inputClassName?: string;
    type?: "number" | "text" | "password" | "email" | "tel"//HTMLInputTypeAttribute;
    name?: string;
    placeholder?: string;
    value?: string;
    override?: boolean;
    onChange?: ((e: ChangeEvent<HTMLInputElement>) => void);
    onChangeText?: ((text: string) => void);
}

const TextInput:React.FC<TextInputProps> = ({
    label,
    labelClassName,
    rootContainerClassName,
    inputClassName,
    type,
    name,
    placeholder,
    value:propValue = "",
    override = false,
    onChange,
    onChangeText,
}) => {
    const [value, setValue] = useState<string>(propValue);

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        if(onChange) {
            onChange(e);
        }

        if(onChangeText) {
            onChangeText(e.currentTarget.value);
        }

        setValue(e.currentTarget.value);
    }

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
                value={override ? propValue : value}
                onChange={handleOnChange}
            />
        </div>
    )
}

export default TextInput;