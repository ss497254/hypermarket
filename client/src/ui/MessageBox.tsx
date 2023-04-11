import React, { memo } from "react";

interface props {
  content: string;
  id: string;
  time: string;
  dir: "left" | "right";
  bg?: keyof typeof bgColor;
}

const dirClassNames = {
  left: "tick-l ml-auto",
  right: "tick-r mr-auto",
};

const bgColor = {
  dark: "bg-dark-700 text-dark-700",
  teal: "bg-teal-600 text-teal-600",
  emerald: "bg-indigo-700 text-indigo-700",
  blue: "bg-blue-600 text-blue-600",
};

export const MessageBox: React.FC<props> = memo(
  ({ content, id, dir, time, bg = "dark" }) => {
    return (
      <div
        className={[
          "max-w-[80%] ltr rotate-180 p-3 whitespace-pre-wrap mx-3 my-1.5 relative rounded-md outline-none",
          dirClassNames[dir],
          bgColor[bg],
        ].join(" ")}
      >
        <p className="overflow-x-hidden text-ellipsis text-sm text-white hover:break-words">
          {content}
        </p>
        <div className="-mb-2 -mr-1 mt-2 text-right text-xs text-white">
          {new Date(time).toString().substr(4, 20)}
        </div>
      </div>
    );
  },
);
