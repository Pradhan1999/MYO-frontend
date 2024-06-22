"use client";
import { Inter } from "next/font/google";
import { useThemeStore } from "@/store";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/utils";
import { ReactToaster } from "@/components/ui/toaster";
import { Toaster } from "react-hot-toast";
import { SonnToaster } from "@/components/ui/sonner";
import { usePathname } from "next/navigation";
import { AuthProvider } from "@/provider/auth.provider";
import { TenantProvider } from "@/provider/tenant.provider";
import Guard from "@/guards";

const inter = Inter({ subsets: ["latin"] });
const Providers = ({ children }) => {
  const { theme, radius, monoChrome } = useThemeStore();
  const location = usePathname();

  // if (location === "/") {
  //   return (
  //     <body className={cn("dash-tail-app ", inter.className)}>
  //       <ThemeProvider
  //         attribute="class"
  //         enableSystem={false}
  //         defaultTheme="light"
  //       >
  //         <div className={cn("h-full  ")}>
  //           {children}
  //           <ReactToaster />
  //         </div>
  //         <Toaster />
  //         <SonnToaster />
  //       </ThemeProvider>
  //     </body>
  //   );
  // }
  return (
    <body
      className={cn("dash-tail-app ", inter.className, "theme-" + theme)}
      style={{
        "--radius": `${radius}rem`,
      }}
    >
      {" "}
      <TenantProvider>
        <AuthProvider>
          <Guard>
            <ThemeProvider
              attribute="class"
              enableSystem={false}
              defaultTheme="light"
            >
              <div className={cn("h-full  ")}>
                {children}
                <ReactToaster />
              </div>
              <Toaster />
              <SonnToaster />
            </ThemeProvider>
          </Guard>
        </AuthProvider>
      </TenantProvider>
    </body>
  );
};

export default Providers;
