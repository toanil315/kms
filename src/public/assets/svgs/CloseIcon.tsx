import * as React from "react";

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.5 8.5L8.5 13.5"
        stroke="#686A70"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 13.5L8.5 8.5"
        stroke="#686A70"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.2169 2H6.78216C3.84281 2 2 4.08119 2 7.02638V14.9736C2 17.9188 3.83405 20 6.78216 20H15.2159C18.165 20 20 17.9188 20 14.9736V7.02638C20 4.08119 18.165 2 15.2169 2Z"
        stroke="#686A70"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
