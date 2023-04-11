import React from "react";
import { Logo } from "./Logo";

interface LogoLoadingProps {}

export const LogoLoading: React.FC<LogoLoadingProps> = () => {
  return (
    <div className="h-screen c">
      <Logo />
    </div>
  );
};
