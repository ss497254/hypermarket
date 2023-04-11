import React from "react";
import { DashboardNavBar } from "./DashboardNavbar";
import { DashboardSidebar } from "./DashboardSidebar";

interface props {
  children: React.ReactNode;
}

export const Layout: React.FC<props> = ({ children }) => {
  return (
    <main className="flex-c min-h-screen pt-14 selection:bg-emerald-700 selection:text-sky-50 lg:pl-[280px]">
      <DashboardNavBar />
      {children}
      <DashboardSidebar />
    </main>
  );
};
