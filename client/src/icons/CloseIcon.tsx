import * as React from "react";

export default function CloseIcon(
  props: React.SVGProps<SVGSVGElement> & { size?: number },
) {
  return (
    <svg
      width={props.size || 26}
      height={props.size || 26}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6 18L18 6M6 6L18 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
