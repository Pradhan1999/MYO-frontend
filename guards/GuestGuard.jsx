"use client";

// ** React Imports
import { ReactNode, ReactElement, useEffect } from "react";

// ** Next Import
import { useRouter } from "next/navigation";

// ** Hooks Import
import { useAuth } from "@/hooks/useContext";

const GuestGuard = (props) => {
  const { children, fallback } = props;
  const auth = useAuth();
  const router = useRouter();

  console.log("guest guard", auth.loading);

  useEffect(() => {
    if (window.localStorage.getItem("userData")) {
      router.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  if (auth.loading || (!auth.loading && !!auth?.user?.id)) {
    return fallback;
  }

  return <>{children}</>;
};

export default GuestGuard;
