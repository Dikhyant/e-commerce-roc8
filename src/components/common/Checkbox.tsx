"use client";

import { useEffect, useRef, useState } from "react";
import CheckboxChecked from "../svg/CheckboxChecked";
import { Dimension } from "~/types/common";
import { usePreventInitialEffect } from "~/hooks/common";
import { cn } from "~/utils/misc";

interface CheckboxProps {
  isChecked?: boolean;
  isOverridden?: boolean;
  text: string;
  className?: string;
  textClassName?: string;
  onChange?: (isChecked: boolean) => void;
  onCheckBoxClick?: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  isChecked: propIsChecked = false,
  isOverridden,
  text,
  className,
  textClassName,
  onChange,
  onCheckBoxClick,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(propIsChecked);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [buttonSize, setButtonSize] = useState<Dimension>({
    width: 20,
    height: 20,
  });

  useEffect(() => {
    if (buttonRef.current) {
      const { clientWidth, clientHeight } = buttonRef.current;
      setButtonSize({
        width: clientWidth,
        height: clientHeight,
      });
    }
  }, [buttonRef]);

  usePreventInitialEffect(() => {
    if (onChange) {
      onChange(isChecked);
    }
  }, [isChecked]);

  function onClick() {
    if (onCheckBoxClick) {
      onCheckBoxClick();
    }
    setIsChecked((_) => !_);
  }

  return (
    <button
      className={cn(
        "flex items-center gap-x-[12px] hover:cursor-pointer",
        className,
      )}
      onClick={onClick}
    >
      <div
        ref={buttonRef}
        className={cn("h-[24px] w-[24px] overflow-hidden rounded-[4px]")}
      >
        {!!isChecked || (isOverridden && propIsChecked) ? (
          <CheckboxChecked
            width={buttonSize.width}
            height={buttonSize.height}
          />
        ) : (
          <div className={cn("h-full w-full bg-[#CCCCCC]")}></div>
        )}
      </div>
      <label
        className={cn(
          "font-inter text-[16px] font-[400] text-[#000000]",
          textClassName ?? textClassName,
        )}
      >
        {text}
      </label>
    </button>
  );
};

export default Checkbox;
