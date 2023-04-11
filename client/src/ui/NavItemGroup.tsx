import React from "react";
import { NavItem, NavItemProps } from "./NavItem";

interface props {
  heading: string;
  items: Omit<NavItemProps, "active">[];
}

export const NavItemGroup: React.FC<props> = ({ heading, items }) => {
  return (
    <div className="mx-4 mb-4">
      <div className="mx-4 mb-2 text-xs font-semibold uppercase text-gray-400">
        {heading}
      </div>
      {items.map((item, idx) => (
        <NavItem key={idx} active={false} {...item} />
      ))}
    </div>
  );
};
