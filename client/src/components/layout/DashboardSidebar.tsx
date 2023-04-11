import { useSidebarDrawerStore } from "src/global-stores/useSidebarDrawerStore";
import { useWindowSizeStore } from "src/global-stores/useWindowSizeStore";
import {
  Compass,
  Home,
  Messages,
  Notification,
  Settings,
  User,
  Warning,
} from "src/icons";
import { Drawer } from "src/ui/Drawer";
import { Logo } from "src/ui/Logo";
import { NavItemGroup } from "src/ui/Sidebar/NavItemGroup";

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

interface props {}

export const DashboardSidebar: React.FC<props> = () => {
  const value = useSidebarDrawerStore();
  const { width } = useWindowSizeStore();

  // useEffect(
  //   () => {
  //     if (!router.isReady) {
  //       return;
  //     }

  //     if (value.open) {
  //       value.toggleOpen();
  //     }
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [router.asPath],
  // );

  return (
    <Drawer
      {...value}
      className="hide-scroll overflow-y-scroll pb-10"
      permanent={width > 1024}
    >
      <Logo className="mx-auto my-8" />
      {navGroups.map((navGroup, idx) => (
        <NavItemGroup key={idx} {...navGroup} />
      ))}
    </Drawer>
  );
};
