import React from "react";

interface props {
  footer: React.ReactNode;
  children: React.ReactNode;
  heading: string;
}

export const Card: React.FC<props> = ({ footer, heading, children }) => {
  return (
    <div className="border-500 mb-4 rounded-lg bg-dark-800 lg:mb-6">
      <h4 className="p-5 text-2xl font-bold md:p-8">{heading}</h4>
      <div className="border-y border-dark-600 p-5 text-base md:p-8">
        {children}
      </div>
      <div className="flex justify-end rounded-b-lg bg-dark-700 p-4">
        {footer}
      </div>
    </div>
  );
};
