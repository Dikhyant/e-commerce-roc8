"use client"

import { useEffect, useRef, useState } from "react";
import CheckboxChecked from "../svg/CheckboxChecked";
import { Dimension } from "~/types/common";

type CheckboxProps = {
    checked?: boolean;
    override?: boolean;
    text: string;
    onChange?: ((checked: boolean) => void);
    onCheckBoxClick?: (() => {});
}

const Checkbox:React.FC<CheckboxProps> = ({
    checked: propChecked = false,
    override,
    text,
    onChange,
    onCheckBoxClick,
}) => {
    const [checked, setChecked] = useState<boolean>(propChecked);
    const buttonRef  = useRef<HTMLButtonElement>(null);
    const [buttonSize, setButtonSize] = useState<Dimension>({width: 20, height: 20});

    useEffect(() => {
        if(buttonRef.current) {
            const { 
                clientWidth,
                clientHeight,
            } = buttonRef.current;
            setButtonSize({
                width: clientWidth,
                height: clientHeight,
            })
            
        }
    }, [buttonRef]);

    useEffect(() => {
        if(onChange) {
            onChange(checked);
        }
    }, [checked]);

    function onClick() {
        if(onCheckBoxClick) {
            onCheckBoxClick();
        }
        setChecked(_ => !_);
    }
    return (
        <div className="flex items-center gap-x-[12px]" >
            <button ref={buttonRef} className="w-[24px] h-[24px] overflow-hidden rounded-[4px]" onClick={onClick} >
            {
                checked || (override && propChecked) ? (
                    <CheckboxChecked width={buttonSize.width} height={buttonSize.height} />
                ) : (<div className={`bg-[#CCCCCC] w-full h-full`} ></div>)
            }
            </button>
            <h6 className={`text-[#000000] text-[16px] font-[400] font-inter`} >{text}</h6>
        </div>
    )
}

export default Checkbox;