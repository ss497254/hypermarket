import React from "react";

export const Spinner: React.FC<{ size?: number; className?: string }> = ({
  size = 16,
  className,
}) => {
  return (
    <svg
      className={`text-button animate-spin ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
      height={size}
      width={size}
    >
      <path
        fill="currentColor"
        d="M10,1V3a7,7,0,1,1-7,7H1a9,9,0,1,0,9-9Z"
      ></path>
    </svg>
  );
};
