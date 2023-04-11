import { Link } from "react-router-dom";
import React, { ReactNode } from "react";

export interface NavItemProps {
  href: string;
  icon: ReactNode;
  title: string;
  active: boolean;
}

export const NavItem: React.FC<NavItemProps> = ({
  href,
  icon,
  title,
  active,
}) => {
  return (
    <Link to={href}>
      <div
        // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
        className={`mb-2 flex w-full cursor-pointer items-center rounded-lg bg-white px-6 py-2.5 font-medium transition duration-300 hover:bg-opacity-10 hover:text-green-400 [&>svg]:mr-4 ${
          active ? "bg-opacity-5 text-green-400" : "bg-opacity-0"
        }`}
      >
        {icon}
        {title}
      </div>
    </Link>
  );
};
