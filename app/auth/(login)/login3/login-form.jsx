"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
// import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
// import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import googleIcon from "@/public/images/auth/google.png";
import facebook from "@/public/images/auth/facebook.png";
import twitter from "@/public/images/auth/twitter.png";
import GithubIcon from "@/public/images/auth/github.png";
import { SiteLogo } from "@/components/svg";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useAuth } from "@/hooks/useContext";

const schema = z.object({
  email: z.string().email({ message: "Your email is invalid." }),
  password: z.string().min(4),
});
const LogInForm = () => {
  const [isPending, startTransition] = React.useTransition();
  const [passwordType, setPasswordType] = React.useState("password");
  const togglePasswordType = () => {
    if (passwordType === "text") {
      setPasswordType("password");
    } else if (passwordType === "password") {
      setPasswordType("text");
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      email: "suryapratapbbr21@gmail.com",
      password: "admin@123",
    },
  });
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");

  const { handleLogin, authLoading } = useAuth();

  const onSubmit = (data) => {
    startTransition(async () => {
      let response = await handleLogin({
        email: data.email,
        password: data.password,
      });
    });
  };
  return (
    <div className="w-full ">
      <Link href="/dashboard" className="flex justify-center">
        <SiteLogo className="" />
      </Link>
      <div className="2xl:text-3xl text-2xl text-center font-extralight">
        Build Together.
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="2xl:mt-7 mt-8">
        <div className="relative">
          <Label
            htmlFor="email"
            className={cn("", {
              " text-sm ": isDesktop2xl,
            })}
          >
            Email or Username
          </Label>
          <Input
            removeWrapper
            type="email"
            id="email"
            size={!isDesktop2xl ? "xl" : "lg"}
            placeholder=" "
            disabled={isPending}
            {...register("email")}
            className={cn("peer", {
              "border-destructive": errors.email,
            })}
          />
        </div>
        {errors.email && (
          <div className=" text-destructive mt-2">{errors.email.message}</div>
        )}

        <div className="relative mt-6">
          <Label
            htmlFor="email"
            className={cn("", {
              " text-sm ": isDesktop2xl,
            })}
          >
            Password
          </Label>
          <div className="relative">
            <Input
              removeWrapper
              type={passwordType === "password" ? "password" : "text"}
              id="password"
              size={!isDesktop2xl ? "xl" : "lg"}
              placeholder=" "
              disabled={isPending}
              {...register("password")}
              className={cn("peer", {
                "border-destructive": errors.password,
              })}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
              onClick={togglePasswordType}
            >
              {passwordType === "password" ? (
                <Icon
                  icon="heroicons:eye"
                  className="w-4 h-4 text-default-400"
                />
              ) : (
                <Icon
                  icon="heroicons:eye-slash"
                  className="w-4 h-4 text-default-400"
                />
              )}
            </div>
          </div>
        </div>
        {errors.password && (
          <div className=" text-destructive mt-2">
            {errors.password.message}
          </div>
        )}

        <div className="my-8 flex flex-wrap gap-2">
          <div className="flex-1 flex items-center gap-1.5 ">
            <Switch defaultChecked />
            <Label
              htmlFor="isRemebered"
              className="text-sm mb-0 text-default-600 cursor-pointer whitespace-nowrap"
            >
              Remember me
            </Label>
          </div>
          <Link href="/auth/forgot3" className="flex-none text-sm text-primary">
            Forget Password?
          </Link>
        </div>
        <Button
          className="w-full rounded-full"
          disabled={isPending}
          size={!isDesktop2xl ? "lg" : "md"}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "Loading..." : "Sign In"}
        </Button>
      </form>
      <div className="2xl:mt-8 mt-6 flex flex-wrap justify-center gap-4">
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="rounded-lg  border-default-300 hover:bg-background"
          disabled={isPending}
          onClick={() =>
            signIn("google", {
              callbackUrl: "/dashboard",
            })
          }
        >
          <Image src={googleIcon} alt="google" className="w-5 h-5" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="rounded-lg border-default-300 hover:bg-background"
          disabled={isPending}
          onClick={() =>
            signIn("github", {
              callbackUrl: "/dashboard",
              redirect: false,
            })
          }
        >
          <Image src={GithubIcon} alt="google" className="w-5 h-5" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="rounded-lg  border-default-300 hover:bg-background"
        >
          <Image src={facebook} alt="google" className="w-5 h-5" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="rounded-lg  border-default-300 hover:bg-background"
        >
          <Image src={twitter} alt="google" className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default LogInForm;
