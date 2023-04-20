import React, { useState } from "react";

interface InputRadioProps {
  name: string;
  heading: string;
  value: string;
  options: string[];
}

export const InputRadio: React.FC<InputRadioProps> = ({
  name,
  options,
  value,
  heading,
}) => {
  return (
    <div className="p-2 space-y-2 bg-gray-50">
      <h4 className="px-2 text-lg font-medium">{heading}</h4>
      {options.map((option, idx, _, active = option === value) => (
        <div
          key={idx}
          className="px-3 py-1.5 space-x-2 rounded cursor-pointer hover:bg-gray-200"
        >
          <input
            type="radio"
            id={option}
            name={name}
            value={option}
            onChange={console.log}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
    </div>
  );
};
