import * as React from "react";

interface CheckboxCheckedProps {
  width?: string | number;
  height?: string | number;
  fill?: string;
  stroke?: string;
  strokeWidth?: string | number;
}

const CheckboxChecked: React.FC<CheckboxCheckedProps> = (props) => {
  const { width, height, fill, stroke, strokeWidth } = props;
  return (
    <svg
      width={width ? width : 24}
      height={height ? height : 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width={24} height={24} rx={0} fill={fill ? fill : "black"} />
      <path
        d="M5 13L8.5 17L19 7"
        stroke={stroke ? stroke : "white"}
        strokeWidth={strokeWidth ? strokeWidth : 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default CheckboxChecked;
