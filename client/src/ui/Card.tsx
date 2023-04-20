import React from "react";

interface props {
  footer: React.ReactNode;
  children: React.ReactNode;
  heading: string;
  className?: string;
}

export const Card: React.FC<props> = ({
  footer,
  heading,
  children,
  className,
}) => {
  return (
    <div className="mb-4 bg-white rounded-lg border-500 lg:mb-6">
      <h4 className="p-4 text-2xl font-bold md:p-6">{heading}</h4>
      <div
        className={[
          "p-5 text-base border-gray-300 border-y md:p-8",
          className,
        ].join(" ")}
      >
        {children}
      </div>
      <div className="flex justify-end p-4 bg-gray-200 rounded-b-lg">
        {footer}
      </div>
    </div>
  );
};
