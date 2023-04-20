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
  data: {
    firstName: string;
    role: string;
  };
}

export const Sidebar: React.FC<props> = ({ navGroups, data }) => {
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
      permanent={width >= 1024}
    >
      <Logo className="mx-auto my-6 bg-white rounded-full" size={128} />
      <div className="px-4 py-2.5 mx-4 capitalize mb-8 bg-gray-400 rounded-md bg-opacity-20">
        <div>
          <h4 className="font-medium text-[17px]">{data.firstName}</h4>
          <h6 className="text-sm py-[2px] text-gray-300">{data.role}</h6>
        </div>
      </div>
      {navGroups.map((navGroup, idx) => (
        <NavItemGroup key={idx} {...navGroup} />
      ))}
    </Drawer>
  );
};
