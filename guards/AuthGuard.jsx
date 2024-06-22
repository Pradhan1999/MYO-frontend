"use client";

// ** React Imports
import { useEffect } from "react";

// ** Next Import
// import { useRouter } from 'next/router';
import { useRouter } from "next/navigation";

// ** Hooks Import
import { useAuth } from "@/hooks/useContext";
import { routes } from "@/config/routes";

const AuthGuard = (props) => {
  const { children, fallback } = props;
  const auth = useAuth();
  // const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!auth?.user?.id && !window.localStorage.getItem("userData")) {
      // if (pathname !== '/') {
      //   router.replace({
      //     pathname: '/login',
      //     query: { returnUrl: pathname },
      //   });
      // } else {
      router.replace(routes.authentication.signIn);
      // }
    }
  }, [router, auth.user]);

  // TODO: Don't know
  if (auth.loading || auth.user === null) {
    // if (auth.loading) {
    return fallback;
  }

  console.log("false success");
  return <>{children}</>;
};

export default AuthGuard;
