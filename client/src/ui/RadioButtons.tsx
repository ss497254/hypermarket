import React from "react";
import { SolidTick } from "src/icons";

interface InputRadioProps {
  heading?: string;
  value?: string;
  options: string[];
  onChange: (x: string) => void;
}

export const RadioButtons: React.FC<InputRadioProps> = ({
  options,
  value,
  heading,
  onChange,
}) => {
  return (
    <div className="p-2 space-y-2 border bg-gray-50">
      {heading && <h4 className="text-lg font-medium">{heading}</h4>}
      {options.map((option, idx, _, active = option === value) => (
        <button
          key={idx}
          className={[
            "pr-3 text-left f items-center w-full py-1.5 rounded cursor-pointer",
            active ? "bg-blue-500 text-white pl-2.5" : "pl-9 hover:bg-gray-200",
          ].join(" ")}
          onClick={() => onChange(option)}
        >
          {active && <SolidTick size={18} className="mr-2" />}
          {option}
        </button>
      ))}
    </div>
  );
};
