import React from "react";

interface props {}

export const CenterLoading: React.FC<props> = () => {
  return (
    <div className="center h-screen w-screen flex-col bg-white">
      <img src="/assets/icon.png" height={180} width={180} />
      <div className="relative my-8 h-[3px] w-[160px] overflow-hidden bg-blue-100">
        <div className="loading-bar h-[3px] w-16 bg-blue-500"></div>
      </div>
      <div className="h-20" />
    </div>
  );
};
