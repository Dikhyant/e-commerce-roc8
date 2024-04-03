"use client";

import { useEffect, useRef, useState } from "react";
import CheckboxChecked from "../svg/CheckboxChecked";
import { Dimension } from "~/types/common";
import { usePreventInitialEffect } from "~/hooks/common";

interface CheckboxProps {
  checked?: boolean;
  override?: boolean;
  text: string;
  className?: string;
  textClassName?: string;
  onChange?: (checked: boolean) => void;
  onCheckBoxClick?: () => {};
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked: propChecked = false,
  override,
  text,
  className,
  textClassName,
  onChange,
  onCheckBoxClick,
}) => {
  const [checked, setChecked] = useState<boolean>(propChecked);
  const buttonRef = useRef<HTMLButtonElement>(null);
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
      onChange(checked);
    }
  }, [checked]);

  function onClick() {
    if (onCheckBoxClick) {
      onCheckBoxClick();
    }
    setChecked((_) => !_);
  }

  return (
    <div className={`flex items-center gap-x-[12px] ${className} `}>
      <button
        ref={buttonRef}
        className="h-[24px] w-[24px] overflow-hidden rounded-[4px]"
        onClick={onClick}
      >
        {checked || (override && propChecked) ? (
          <CheckboxChecked
            width={buttonSize.width}
            height={buttonSize.height}
          />
        ) : (
          <div className={`h-full w-full bg-[#CCCCCC]`}></div>
        )}
      </button>
      <h6
        className={`font-inter text-[16px] font-[400] text-[#000000] ${textClassName ? textClassName : ""}`}
      >
        {text}
      </h6>
    </div>
  );
};

export default Checkbox;
