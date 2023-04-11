import React from "react";
import { useSidebarDrawerStore } from "src/global-stores/useSidebarDrawerStore";
import { Hamburger } from "src/icons";
import { IconButton } from "src/ui/IconButton";

interface props {}

export const NavBar: React.FC<props> = () => {
  const { toggleOpen: toggleSidebar } = useSidebarDrawerStore();

  return (
    <div className="absolute top-0 z-50 flex h-14 items-center px-4 font-semibold">
      <IconButton onClick={toggleSidebar} className="mr-4 lg:hidden">
        <Hamburger />
      </IconButton>
      Hypermarket
    </div>
  );
};
