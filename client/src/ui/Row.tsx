import React from "react";

interface props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Row: React.FC<props> = ({ children, className, ...props }) => {
  return (
    <div
      className={["f justify-between items-center", className].join(" ")}
      {...props}
    >
      {children}{" "}
    </div>
  );
};
