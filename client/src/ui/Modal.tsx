import React from "react";
import { createPortal } from "react-dom";

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  setOpen: (x: boolean) => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  children,
  setOpen,
  ...props
}) => {
  if (!open) {
    document.body.classList.remove("modal-body-fixed");
    return null;
  }

  document.body.classList.add("modal-body-fixed");

  return createPortal(
    <div
      onClick={(e) => {
        !e.defaultPrevented && setOpen(false);
      }}
      className="fixed inset-0 z-50 flex-col duration-500 c backdrop-blur-sm"
    >
      <div {...props} onClick={(e) => e.preventDefault()}>
        {children}
      </div>
    </div>,
    document.querySelector("body")!,
  );
};
