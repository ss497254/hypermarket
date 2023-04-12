import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAdminStore } from "src/global-stores/useAdminStore";
import { ChartBar, Home, OutlineGlobe, Settings, User } from "src/icons";
import { wrappedGet } from "src/utils/wrappedGet";
import { NavBar } from "../../ui/Navbar";
import { Sidebar } from "../../ui/Sidebar";

const navGroups = [
  {
    heading: "Main",
    items: [
      { href: "/admin", icon: <Home size={18} />, title: "Home" },
      {
        href: "/admin/sales",
        icon: <ChartBar />,
        title: "Sales",
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
      { href: "/admin/staffs", icon: <User />, title: "Staffs" },
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

const AdminLayout = () => {
  const res = resource.read();

  const { setAdmin } = useAdminStore();

  useEffect(() => {
    if (res?.data?.username) setAdmin(res.data);
  }, []);

  return (
    <main className="flex-c min-h-screen pt-14 selection:bg-emerald-700 selection:text-sky-50 lg:pl-[280px]">
      <NavBar />
      <Outlet />
      <Sidebar navGroups={navGroups} />
    </main>
  );
};

export default AdminLayout;
