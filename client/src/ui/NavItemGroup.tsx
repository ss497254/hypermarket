import React from "react";
import { useRouter } from "next/router";
import { NavItem, NavItemProps } from "./NavItem";

interface props {
  heading: string;
  items: Omit<NavItemProps, "active">[];
}

export const NavItemGroup: React.FC<props> = ({ heading, items }) => {
  const { pathname } = useRouter();

  return (
    <div className="mx-4 mb-4">
      <div className="mx-4 mb-2 text-xs font-semibold text-gray-400 uppercase">
        {heading}
      </div>
      {items.map((item, idx) => (
        <NavItem key={idx} active={pathname === item.href} {...item} />
      ))}
    </div>
  );
};
