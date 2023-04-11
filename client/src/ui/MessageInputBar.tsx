import React, { useRef } from "react";
import { Loading, Rocket } from "src/icons";
import { ExpandingTextArea } from "./ExpandingTextArea";
import { IconButton } from "./IconButton";

interface props {
  submitting?: boolean;
  onSubmit: (message: string) => void;
}

export const MessageInputBar: React.FC<props> = ({ onSubmit, submitting }) => {
  const ref = useRef<HTMLSpanElement>(null);

  return (
    <div className="flex items-end bg-dark-700 p-3 px-4">
      <ExpandingTextArea name="message" ref={ref} />
      <IconButton
        onClick={() => {
          if (submitting) return;

          onSubmit(ref.current?.innerText || "(empty)");

          if (ref.current) {
            ref.current.innerText = "";
            ref.current.focus();
          }
        }}
        className="ml-3 h-fit !p-3 hover:rounded-full"
      >
        {submitting ? <Loading /> : <Rocket />}
      </IconButton>
    </div>
  );
};
