import React, { useEffect } from "react";
import { NavBar } from "../../ui/Navbar";
import { Sidebar } from "../../ui/Sidebar";
import { Home, Notification } from "src/icons";
import { wrappedGet } from "src/utils/wrappedGet";
import { useStaffStore } from "src/global-stores/useStaffStore";

interface props {
  children: React.ReactNode;
}

const navGroups = [
  {
    heading: "Main",
    items: [
      { href: "/", icon: <Home size={18} />, title: "Home" },
      {
        href: "/notifications",
        icon: <Notification />,
        title: "Notifications",
      },
    ],
  },
];

const resource = wrappedGet("/api/staff/me");

export const StaffLayout: React.FC<props> = ({ children }) => {
  const res = resource.read();

  const { setStaff } = useStaffStore();

  useEffect(() => {
    if (res?.data?.username) setStaff(res.data);
  }, []);

  return (
    <main className="flex-c min-h-screen pt-14 selection:bg-emerald-700 selection:text-sky-50 lg:pl-[280px]">
      <NavBar />
      {children}
      <Sidebar navGroups={navGroups} />
    </main>
  );
};

export default function withStaffLayout(Page: () => JSX.Element) {
  return () => (
    <StaffLayout>
      <Page />
    </StaffLayout>
  );
}
