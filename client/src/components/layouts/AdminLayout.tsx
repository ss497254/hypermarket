import React, { useEffect } from "react";
import { useAdminStore } from "src/global-stores/useAdminStore";
import { Home, Notification, OutlineGlobe, Settings, User } from "src/icons";
import { wrappedGet } from "src/utils/wrappedGet";
import { NavBar } from "../../ui/Navbar";
import { Sidebar } from "../../ui/Sidebar";

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
  {
    heading: "Manage",
    items: [
      {
        href: "/admin/products",
        icon: <OutlineGlobe />,
        title: "Products",
      },
      { href: "/admin/staff", icon: <User />, title: "Staff" },
    ],
  },
  {
    heading: "Account",
    items: [
      {
        href: "/admin/settings",
        icon: <Settings size={18} />,
        title: "Settings",
      },
    ],
  },
];

const resource = wrappedGet("/api/admin/me");

export const AdminLayout: React.FC<props> = ({ children }) => {
  const res = resource.read();

  const { setAdmin } = useAdminStore();

  useEffect(() => {
    if (res?.data?.username) setAdmin(res.data);
  }, []);

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
