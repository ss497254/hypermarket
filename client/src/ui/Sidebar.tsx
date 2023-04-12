import { useEffect } from "react";
import { useRouter } from "next/router";
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
  const { pathname } = useRouter();

  useEffect(() => {
    if (value.open) {
      value.toggleOpen();
    }
  }, [pathname]);

  return (
    <Drawer
      {...value}
      className="pb-10 overflow-y-scroll text-white hide-scroll"
      permanent={width > 1024}
    >
      <Logo className="mx-auto my-8 bg-white rounded-full" size={128} />
      {navGroups.map((navGroup, idx) => (
        <NavItemGroup key={idx} {...navGroup} />
      ))}
    </Drawer>
  );
};
