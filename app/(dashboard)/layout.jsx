"use client";

import { usePathname, redirect } from "next/navigation";
import MainLayout from "./main-layout";

const Layout = ({ children }) => {
  const pathname = usePathname();
  if (pathname === "/") {
    redirect("/dashboard");
  }
  return <MainLayout>{children}</MainLayout>;
};

export default Layout;
