import React from "react";
import { useSidebarDrawerStore } from "src/global-stores/useSidebarDrawerStore";
import { Hamburger } from "src/icons";
import { IconButton } from "src/ui/IconButton";

interface props {}

export const DashboardNavBar: React.FC<props> = () => {
  const { toggleOpen: toggleSidebar } = useSidebarDrawerStore();

  return (
    <div className="fixed top-0 z-50 flex h-14 w-full items-center bg-dark-800 px-4 font-semibold">
      <IconButton onClick={toggleSidebar} className="mr-4 lg:hidden">
        <Hamburger />
      </IconButton>
      Dashboard
    </div>
  );
};
