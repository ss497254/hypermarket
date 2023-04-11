import React from "react";

export const BadgeTypes = {
  default: "bg-blue-900 text-blue-200",
  red: "bg-red-900 text-red-200",
  green: "bg-green-900 text-green-200",
  yellow: "bg-yellow-700/90 text-yellow-200",
  indigo: "bg-indigo-900 text-indigo-200",
  purple: "bg-purple-900 text-purple-200",
  pink: "bg-pink-900 text-pink-200",
};

export const BadgeSizes = {
  xs: "text-xs font-medium mr-2 px-2.5 py-0.5",
  sm: "text-sm font-medium mr-2.5 px-3 py-[3px]",
  default: "text-base mr-3 px-3 py-1",
};

interface props extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  type?: keyof typeof BadgeTypes;
  size?: keyof typeof BadgeSizes;
}

export const Badge: React.FC<props> = ({
  children,
  type = "default",
  size = "default",
  className,
  ...props
}) => {
  return (
    <span
      {...props}
      className={[
        "rounded antialiased",
        className,
        BadgeSizes[size],
        BadgeTypes[type],
      ].join(" ")}
    >
      {children}
    </span>
  );
};
