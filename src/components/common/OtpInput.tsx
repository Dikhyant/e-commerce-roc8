"use client"
import { ChangeEvent, useEffect, useRef, useState } from "react";

type OtpInputProps = {
    numberOfDigits?: number;
    label?: string;
    className?: string;
    onChangeOtp?: ((otp: string) => void);
}

const OtpInput:React.FC<OtpInputProps> = ({
    numberOfDigits = 6,
    label,
    className,
    onChangeOtp,
}) => {
    const [otp , setOtp] = useState<string[]>(new Array(numberOfDigits).fill(""));
    const [indexOfFocusedInput, setIndexOfFocusedInput] = useState<number>(0);
    const refOfFocusedInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        console.log("otp ", otp);
        if(onChangeOtp) {
            onChangeOtp(otp.join(""));
        }
    }, [otp]);

    useEffect(() => {
        if(refOfFocusedInput.current) {
            refOfFocusedInput.current.focus();
        }
    }, [refOfFocusedInput, indexOfFocusedInput]);

    function onInputChange(ev: ChangeEvent<HTMLInputElement>) {
        console.log('ev.currentTarget.value ',ev.currentTarget.value);
        if(indexOfFocusedInput >= numberOfDigits) return;
        
        const regex = /^(\s*|\d+)$/;
        if(!regex.test(ev.currentTarget.value)) return;
        const newOtp = [...otp];
        newOtp[indexOfFocusedInput] = ev.currentTarget.value.substring(ev.currentTarget.value.length - 1);
        setOtp(newOtp);
        if(indexOfFocusedInput + 1 < numberOfDigits && newOtp[indexOfFocusedInput]) {
            setIndexOfFocusedInput(indexOfFocusedInput + 1);
        }
    }

    function onInputClick() {
        if(refOfFocusedInput.current) {
            refOfFocusedInput.current.setSelectionRange(1,1);
        }
    }

    function onInputFocus(index: number) {
        if(index >= numberOfDigits || index < 0) return;
        setIndexOfFocusedInput(index);
    }

    async function onInputPaste(index: number) {
        if(index >= numberOfDigits || index < 0) return;
        const clipboardText:string = await navigator.clipboard.readText();
        const regex = /^(\s*|\d+)$/;
        if(!regex.test(clipboardText)) return;
        const newOtp = [...otp];
        let i, j = 0;
        for(i = index; i < numberOfDigits && j < clipboardText.length; i++, j++) {
            newOtp[i] = clipboardText[j] as string;
        }
        setOtp(newOtp);
        if(i < numberOfDigits ) {
            setIndexOfFocusedInput(i);
        } 
        if(i >= numberOfDigits) {
            setIndexOfFocusedInput(numberOfDigits - 1);
        }
    }
    
    return (
        <div
            className={`${className ? className : ""}`}
        >
            {
                label ? (
                    <h6 className="text-[#000] text-[16px] font-[400]" >{label}</h6>
                ) : (<></>)
            }
            <div
                className="flex items-center gap-x-[12px]"
            >
                {
                    otp.map((_, index) => {
                        return (
                            <input
                                key={index}
                                type="tel"
                                className={`aspect-[46/48] w-[46px] border-[#C1C1C1] border-[1px] 
                                            rounded-[6px] side-button-none text-center`}
                                ref={index === indexOfFocusedInput ? refOfFocusedInput : null}
                                value={otp[index]}
                                onChange={onInputChange}
                                onClick={onInputClick}
                                onKeyDown={(ev) => {
                                    if(ev.key !== "Backspace") return;
                                    if(indexOfFocusedInput - 1 >= 0 && otp[index] === "") {
                                        setIndexOfFocusedInput(indexOfFocusedInput - 1);
                                    }
                                }}
                                onFocus={() => {
                                    onInputFocus(index);
                                }}
                                onPaste={()=>{onInputPaste(index);}}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default OtpInput;