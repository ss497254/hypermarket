import React from "react";

interface props {}

export const IconButton: React.FC<
  props & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className, children, ...prop }) => {
  return (
    <button
      className={["p-2.5 rounded-md bg-dark-600", className].join(" ")}
      {...prop}
    >
      {children}
    </button>
  );
};
