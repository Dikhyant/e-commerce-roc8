"use client";

import React from "react";
import SpinningLoader from "../svg/SpinningLoader";
import { cn } from "~/utils/misc";

interface PrimaryButtonProps {
  text: string;
  type?: "submit" | "reset" | "button";
  className?: string;
  isDisabled?: boolean;
  isLoaderVisible?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  text,
  type,
  className,
  isDisabled,
  isLoaderVisible,
  onClick,
}) => {
  return (
    <button
      disabled={isDisabled}
      type={type ? type : "button"}
      className={cn(
        "relative flex h-[56px] w-full items-center justify-center rounded-[6px] text-[#fff]",
        isDisabled ? "bg-[#626262]" : "bg-[#000]",
        className,
      )}
      onClick={(e) => {
        if (onClick) onClick(e);
      }}
    >
      {text ? text : ""}
      {isLoaderVisible ? (
        <SpinningLoader
          width={30}
          height={30}
          className="absolute right-[5%]"
        />
      ) : (
        <></>
      )}
    </button>
  );
};

export default PrimaryButton;
