/* eslint-disable no-unused-expressions */
import React, { forwardRef } from "react";

export interface TextAreaProps
  extends React.ComponentPropsWithoutRef<"textarea"> {
  textarea?: boolean;
  minRows?: number;
  error?: string;
  transparent?: boolean;
}

export const ExpandingTextArea = forwardRef<HTMLSpanElement, TextAreaProps>(
  ({ className, textarea, error, transparent, ...props }, ref) => {
    const ring = error ? `ring-1 ring-secondary` : "";
    const cn = `remove-scroll whitespace-pre-line overflow-y-scroll max-h-[300px] w-full py-2 px-3 rounded focus:outline-none bg-dark-600 ${ring} ${className} `;

    return (
      <span
        ref={ref as any}
        className={cn}
        style={{ resize: "none" }}
        contentEditable
        {...props}
      />
    );
  },
);

ExpandingTextArea.displayName = "TextArea";
