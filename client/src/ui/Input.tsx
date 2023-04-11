import React, { forwardRef, useMemo } from "react";
import { generateId } from "src/utils/lodash";

export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
  containerClassName?: string;
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, containerClassName, error, label, required, ...props },
    ref,
  ) => {
    const id: any = useMemo(generateId, []);

    return (
      <div
        className={[
          "overflow-hidden text-sm rounded ring-blue-500 focus-within:ring-1 bg-neutral-100",
          error && "ring-red-600 ring-1",
          required && "field-required",
          containerClassName,
        ].join(" ")}
      >
        <label
          htmlFor={id}
          className="block px-3 pt-2 font-medium text-gray-900"
        >
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          required={required}
          className={[
            "w-full pb-3 px-3 pt-2 h-10 placeholder-gray-500 bg-inherit focus:outline-none",
            className,
          ].join(" ")}
          {...props}
        ></input>
      </div>
    );
  },
);
