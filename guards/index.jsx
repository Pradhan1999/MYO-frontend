"use client";

import AuthGuard from "./AuthGuard";
import GuestGuard from "./GuestGuard";
import { useParams, usePathname } from "next/navigation";
import { routes } from "@/config/routes";
import { Loading } from "./Loading";
import LayoutLoader from "@/components/layout-loader";

const Guard = ({ children }) => {
  const pathName = usePathname();
  const { token } = useParams();
  const allRoutes = [
    routes.onboarding,
    routes.authentication.signIn,
    routes.authentication.signUp,
    routes.authentication.forgotPassword,
    routes.authentication.setupPassword(token),
  ];
  if (allRoutes.includes(pathName)) {
    return <GuestGuard fallback={<LayoutLoader />}>{children}</GuestGuard>;
    // } else if (!guestGuard && !authGuard) {
    //   return <>{children}</>
  } else {
    return <AuthGuard fallback={<LayoutLoader />}>{children}</AuthGuard>;
  }
};

export default Guard;
