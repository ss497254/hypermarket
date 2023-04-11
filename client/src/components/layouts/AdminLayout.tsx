import React from "react";
import { NavBar } from "../../ui/Navbar";
import { Sidebar } from "../../ui/Sidebar";
import { Home, Notification } from "src/icons";

interface props {
  children: React.ReactNode;
}

const navGroups = [
  {
    heading: "Main",
    items: [
      { href: "/admin", icon: <Home size={18} />, title: "Home" },
      {
        href: "/notifications",
        icon: <Notification />,
        title: "Notifications",
      },
    ],
  },
];

export const AdminLayout: React.FC<props> = ({ children }) => {
  return (
    <main className="flex-c min-h-screen pt-14 selection:bg-emerald-700 selection:text-sky-50 lg:pl-[280px]">
      <NavBar />
      {children}
      <Sidebar navGroups={navGroups} />
    </main>
  );
};

export default function withAdminLayout(Page: () => JSX.Element) {
  return () => (
    <AdminLayout>
      <Page />
    </AdminLayout>
  );
}
