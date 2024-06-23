import { SiteLogo } from "@/components/svg";
import logo from "@/public/images/logo/redrover-logo.png";
import favicon from "@/app/favicon.ico";
import { useSidebar } from "@/store";
// import { Link } from "lucide-react";
import Image from "next/image";
import React from "react";

const SidebarLogo = ({ hovered }) => {
  const { sidebarType, setCollapsed, collapsed } = useSidebar();
  return (
    <div className="px-4 py-4 ">
      <div className=" flex items-center">
        <div className="flex flex-1 items-center  space-x-3  ">
          {/* <SiteLogo className="w-full object-contain text-primary" /> */}
          {!collapsed || hovered ? (
            <Image src={logo} alt="img" />
          ) : (
            <Image src={favicon} alt="img" />
          )}
        </div>
        {sidebarType === "classic" && (!collapsed || hovered) && (
          <div className="flex-none lg:block hidden">
            <div
              onClick={() => setCollapsed(!collapsed)}
              className={`h-4 w-4 border-[1.5px] border-default-900 dark:border-default-200 rounded-full transition-all duration-150
          ${
            collapsed
              ? ""
              : "ring-2 ring-inset ring-offset-4 ring-default-900  bg-default-900  dark:ring-offset-default-300"
          }
          `}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarLogo;
