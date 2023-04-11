import React from "react";
import { Logo } from "./Logo";

interface LogoLoadingProps {}

export const LogoLoading: React.FC<LogoLoadingProps> = () => {
  return (
    <div className="h-screen c flex-c">
      <Logo size={180} />
      <div className="w-[160px] relative bg-blue-100 h-[3px] overflow-hidden my-2">
        <div className="bg-blue-500 loading-bar w-16 h-[3px]"></div>
      </div>
    </div>
  );
};
