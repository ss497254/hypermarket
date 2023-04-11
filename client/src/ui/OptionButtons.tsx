import React from "react";

interface OptionButtonsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  label: string;
  options: string[];
  value: string | undefined;
  onChange: (value: any) => void;
  error?: string;
  containerClassName?: string;
}

export const OptionButtons: React.FC<OptionButtonsProps> = ({
  options,
  error,
  label,
  className,
  containerClassName,
  value = "",
  onChange,
  ...props
}) => {
  return (
    <div
      className={[
        "px-3 py-2 overflow-hidden text-sm rounded min-h-[64px] focus-within:ring-1 bg-dark-600",
        error && "ring-red-600 ring-1",
        containerClassName,
      ].join(" ")}
    >
      <div className="text-dark-200">{label}</div>
      <div
        className={[
          "overflow-hidden rounded-md space-x-0.5 w-full my-1.5 f",
          className,
        ].join(" ")}
        {...props}
      >
        {options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => {
              onChange(option);
            }}
            className={[
              "py-2 flex-1 focus:ring-0 transition-all duration-200",
              value === option ? "bg-emerald-500" : "bg-dark-700",
            ].join(" ")}
          >
            {option}
          </button>
        ))}
      </div>
      <p className="-my-1 text-xs text-red-300">{error}</p>
    </div>
  );
};
