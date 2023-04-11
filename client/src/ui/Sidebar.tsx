import { useEffect } from "react";
import { useSidebarDrawerStore } from "src/global-stores/useSidebarDrawerStore";
import { useWindowSizeStore } from "src/global-stores/useWindowSizeStore";
import { Drawer } from "src/ui/Drawer";
import { Logo } from "src/ui/Logo";
import { NavItemGroup } from "src/ui/NavItemGroup";

interface props {
  navGroups: {
    heading: string;
    items: {
      href: string;
      icon: JSX.Element;
      title: string;
    }[];
  }[];
}

export const Sidebar: React.FC<props> = ({ navGroups }) => {
  const value = useSidebarDrawerStore();
  const { width } = useWindowSizeStore();

  useEffect(() => {
    if (value.open) {
      value.toggleOpen();
    }
  }, [window.location.href]);

  return (
    <Drawer
      {...value}
      className="hide-scroll overflow-y-scroll text-white pb-10"
      permanent={width > 1024}
    >
      <Logo className="mx-auto my-8 bg-white rounded-full" size={128} />
      {navGroups.map((navGroup, idx) => (
        <NavItemGroup key={idx} {...navGroup} />
      ))}
    </Drawer>
  );
};
