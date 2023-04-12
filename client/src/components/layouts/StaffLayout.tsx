import { useEffect } from "react";
import { useStaffStore } from "src/global-stores/useStaffStore";
import { useGet } from "src/hooks/ApiHooks";
import { ChartBar, Home, OutlineGlobe, Settings, User } from "src/icons";
import Router from "next/router";
import { StaffType } from "src/types/StaffType";
import { NavBar } from "../../ui/Navbar";
import { Sidebar } from "../../ui/Sidebar";
import { LogoLoading } from "src/ui/LogoLoading";

const navGroups = [
  {
    heading: "Main",
    items: [
      { href: "/staff", icon: <Home size={18} />, title: "Home" },
      {
        href: "/staff/orders",
        icon: <ChartBar />,
        title: "Orders",
      },
    ],
  },
  {
    heading: "Manage",
    items: [
      {
        href: "/staff/products",
        icon: <OutlineGlobe />,
        title: "Products",
      },
    ],
  },
  {
    heading: "Account",
    items: [
      {
        href: "/staff/settings",
        icon: <Settings size={18} />,
        title: "Settings",
      },
    ],
  },
];

export interface StaffLayoutProps {
  children: React.ReactNode;
}

const StaffLayout: React.FC<StaffLayoutProps> = ({ children }) => {
  const { run, error } = useGet<{ data: StaffType }>("/api/staff/me");
  const { staff, setStaff } = useStaffStore();

  useEffect(() => {
    run().then((res) => {
      if (res?.data.username) {
        setStaff(res.data);
      }
    });
  }, []);

  if (error) {
    Router.push("/staff/login");
  }

  if (!staff?.username) return <LogoLoading />;

  return (
    <main className="flex-c min-h-screen bg-indigo-300 lg:ml-[280px]">
      <NavBar />
      {children}
      <Sidebar navGroups={navGroups} />
    </main>
  );
};

export default StaffLayout;
