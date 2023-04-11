import React from "react";
import { Modal, ModalProps } from "./Modal";

interface props extends ModalProps {
  footer: React.ReactNode;
  children: React.ReactNode | any;
  heading: string;
}

export const StyledModal: React.FC<props> = ({
  children,
  className,
  heading,
  footer,
  open,
  setOpen,
  ...props
}) => {
  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="border-500 mb-4 rounded-lg bg-dark-800 lg:mb-6">
        <h4 className="p-5 text-2xl font-bold md:px-7">{heading}</h4>
        <div
          className={[
            "p-5 overflow-y-scroll max-h-[60vh] text-base md:p-8 border-y border-dark-500",
            className,
          ].join(" ")}
          {...props}
        >
          {children}
        </div>
        <div className="flex justify-end rounded-b-lg bg-dark-700 p-4">
          {footer}
        </div>
      </div>
    </Modal>
  );
};
