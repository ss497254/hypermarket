import { useEffect } from "react";
import { useAdminStore } from "src/global-stores/useAdminStore";
import { useGet } from "src/hooks/ApiHooks";
import { ChartBar, Home, OutlineGlobe, Settings, User } from "src/icons";
import Router from "next/router";
import { AdminType } from "src/types/AdminType";
import { NavBar } from "../../ui/Navbar";
import { Sidebar } from "../../ui/Sidebar";
import { LogoLoading } from "src/ui/LogoLoading";

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

export interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { run, error } = useGet<{ data: AdminType }>("/api/admin/me");
  const { admin, setAdmin } = useAdminStore();

  useEffect(() => {
    run().then((res) => {
      if (res?.data.username) {
        setAdmin(res.data);
      }
    });
  }, []);

  if (error) {
    Router.push("/login");
  }

  if (!admin?.username) return <LogoLoading />;

  return (
    <main className="flex-c min-h-screen pt-14 lg:pl-[280px]">
      <NavBar />
      {children}
      <Sidebar navGroups={navGroups} />
    </main>
  );
};

export default AdminLayout;
