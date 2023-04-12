import React from "react";
import { useSidebarDrawerStore } from "src/global-stores/useSidebarDrawerStore";
import { Hamburger } from "src/icons";
import { IconButton } from "src/ui/IconButton";

interface props {}

export const NavBar: React.FC<props> = () => {
  const { toggleOpen: toggleSidebar } = useSidebarDrawerStore();

  return (
    <div className="flex items-center px-4 text-lg font-semibold bg-white md:pl-8 h-14">
      <IconButton onClick={toggleSidebar} className="mr-4 lg:hidden">
        <Hamburger />
      </IconButton>
      Hypermarket
    </div>
  );
};
