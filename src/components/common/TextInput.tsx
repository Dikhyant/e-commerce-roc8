"use client";
import { ChangeEvent, useState } from "react";
import { cn } from "~/utils/misc";

interface TextInputProps {
  label?: string;
  labelClassName?: string;
  rootContainerClassName?: string;
  inputClassName?: string;
  type?: "number" | "text" | "password" | "email" | "tel"; //HTMLInputTypeAttribute;
  name?: string;
  placeholder?: string;
  value?: string;
  isOverridden?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeText?: (text: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  labelClassName,
  rootContainerClassName,
  inputClassName,
  type,
  name,
  placeholder,
  value: propValue = "",
  isOverridden = false,
  onChange,
  onChangeText,
}) => {
  const [value, setValue] = useState<string>(propValue);

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    if (onChange) {
      onChange(e);
    }

    if (onChangeText) {
      onChangeText(e.currentTarget.value);
    }

    setValue(e.currentTarget.value);
  }

  return (
    <div className={cn("w-full ", rootContainerClassName)}>
      {label ? (
        <h6
          className={cn("text-[16px] font-[400] text-[#000]", labelClassName)}
        >
          {label}
        </h6>
      ) : (
        <></>
      )}
      <input
        className={cn(
          "h-[48px] w-full rounded-[6px] border-[1px] border-[#C1C1C1] pl-[16px] placeholder:text-[#848484]",
          inputClassName,
        )}
        placeholder={placeholder ? placeholder : "Enter"}
        type={type ? type : "text"}
        name={name ? name : ""}
        value={!!isOverridden ? propValue : value}
        onChange={handleOnChange}
      />
    </div>
  );
};

export default TextInput;
