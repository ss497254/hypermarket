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
      <div className="mb-4 bg-white border border-gray-300 rounded-lg border-500 lg:mb-6">
        <h4 className="p-5 text-2xl font-bold md:px-7">{heading}</h4>
        <div
          className={[
            "p-5 overflow-y-scroll max-h-[70vh] text-base md:p-8 border-y border-gray-200",
            className,
          ].join(" ")}
          {...props}
        >
          {children}
        </div>
        <div className="flex flex-row-reverse p-4 bg-gray-100 rounded-b-lg">
          {footer}
        </div>
      </div>
    </Modal>
  );
};
