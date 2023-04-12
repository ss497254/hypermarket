import React, { forwardRef, useMemo } from "react";
import { generateId } from "src/utils/lodash";

export interface TextAreaProps
  extends React.ComponentPropsWithoutRef<"textarea"> {
  label: string;
  containerClassName?: string;
  error?: string;
  resize?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { className, containerClassName, error, label, required, resize, ...props },
    ref,
  ) => {
    const id: any = useMemo(generateId, []);

    return (
      <div
        className={[
          "overflow-hidden text-sm rounded ring-blue-500 focus-within:ring-1 bg-gray-200",
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
        <textarea
          id={id}
          ref={ref}
          required={required}
          className={[
            "w-full py-2.5 px-3 placeholder-gray-500 bg-inherit focus:outline-none",
            !resize && "resize-none",
            className,
          ].join(" ")}
          {...props}
        />
      </div>
    );
  },
);

TextArea.displayName = "TextArea";
