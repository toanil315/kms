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
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2 5.5C2 2.87479 2.02811 2 5.5 2C8.97189 2 9 2.87479 9 5.5C9 8.12521 9.01107 9 5.5 9C1.98893 9 2 8.12521 2 5.5Z"
        stroke="#686A70"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13 5.5C13 2.87479 13.0281 2 16.5 2C19.9719 2 20 2.87479 20 5.5C20 8.12521 20.0111 9 16.5 9C12.9889 9 13 8.12521 13 5.5Z"
        stroke="#686A70"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2 16.5C2 13.8748 2.02811 13 5.5 13C8.97189 13 9 13.8748 9 16.5C9 19.1252 9.01107 20 5.5 20C1.98893 20 2 19.1252 2 16.5Z"
        stroke="#686A70"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13 16.5C13 13.8748 13.0281 13 16.5 13C19.9719 13 20 13.8748 20 16.5C20 19.1252 20.0111 20 16.5 20C12.9889 20 13 19.1252 13 16.5Z"
        stroke="#686A70"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
