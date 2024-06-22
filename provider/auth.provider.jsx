"use client";

// ** React Imports
import { createContext, useEffect, useState } from "react";

// ** Next Import
import { useRouter, usePathname, useParams } from "next/navigation";

// ** Config
import { login, register, verifyOtp, verifyToken } from "@/services/auth";
import { getCurrentUser } from "@/services/user";
import { routes } from "@/config/routes";
import toast from "react-hot-toast";

const storageTokenKeyName = "accessToken";

// ** Defaults
const defaultProvider = {
  user: null,
  loading: false,
  // subscription active flag
  subscriptionActive: false,
  handleLogin: () => Promise.resolve(),
  handleLogout: () => Promise.resolve(),
  handleSignUp: () => Promise.resolve(),
  // authLoading: false,
  // forgotLoading: false,
  // setUser: () => null,
  // setLoading: () => Boolean,
  // verify: () => Promise.resolve(),
  // createPassword: () => Promise.resolve(),
  // forgotPassword: () => Promise.resolve(),
  // resetPass: () => Promise.resolve(),
  // setForgotLoading: () => Boolean,
  // setSelectedSideBar: () => null,
  // selectedSideBar: 'dashboard',
  // setAuthLoading: () => Boolean,
  // getSelectedSideBar: () => null,
  // setActiveAccount: () => null,
  // activeAccount: {},
  // verifyUser: () => Promise.resolve(),
  // getActiveAccount: () => {},
  // updateProfile: () => {},
  // userResetPassword: () => {},
  // btnLoading: false,
  // setSocketIo: () => null,
  // socketIo: {},
};
const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children }) => {
  // ** States
  //this state is used to store the active account of the user

  const [user, setUser] = useState(defaultProvider.user);
  const [subscriptionActive, setSubscriptionActive] = useState(
    defaultProvider.subscriptionActive
  );
  const [loading, setLoading] = useState(defaultProvider.loading);
  const [forgotLoading, setForgotLoading] = useState(
    defaultProvider.forgotLoading
  );
  const [authLoading, setAuthLoading] = useState(defaultProvider.authLoading);
  // const [btnLoading, setBtnLoading] = useState(false);
  // ** Hooks
  const router = useRouter();
  const pathName = usePathname();
  const { returnUrl: returnUrlQuery } = useParams();

  const getUser = async (cb) =>
    getCurrentUser()
      .then(async (response) => {
        console.log("get current user res: ", response);
        setLoading(false);
        setUser({ ...response.data });
        cb && cb();
      })
      .catch((err) => {
        console.log("error in fetch me", err);
        localStorage.removeItem("userData");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
        setUser(null);
        setLoading(false);
        setAuthLoading(false);
        if (!pathName.includes("signin")) {
          router.replace(routes.authentication.signIn);
        }
      });
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage.getItem(storageTokenKeyName);
      if (storedToken) {
        setLoading(true);
        getUser();
      } else {
        setLoading(false);
      }
    };
    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = (params, cb, errorCallback) => {
    setAuthLoading(true);
    login(params)
      .then(async (response) => {
        console.log("login res: ", response);
        window.localStorage.setItem(storageTokenKeyName, response?.accessToken);
        toast.success(
          <div>
            Welcome back,{" "}
            {`${response?.payload?.firstName} ${response?.payload?.lastName}`}!
          </div>
        );
        getUser(() => {
          const returnUrl = returnUrlQuery;
          window.localStorage.setItem(
            "userData",
            JSON.stringify(response?.payload)
          );

          const redirectURL = returnUrl && returnUrl !== "/" ? returnUrl : "/";
          router.replace(redirectURL);

          setAuthLoading(false);
        });
      })
      .catch((err) => {
        toast.error(err?.message || "Something went wrong");
        setAuthLoading(false);

        if (errorCallback) errorCallback(err);
      });
  };

  const handleLogout = () => {
    setUser(null);
    alert("logout");
    window.localStorage.removeItem("userData");
    window.localStorage.removeItem(storageTokenKeyName);
    router.push("/");
  };
  const handleSignUp = ({ body }, successCb, errorCallback) => {
    setAuthLoading(true);
    register({ body })
      .then(async (response) => {
        router.push(routes.authentication.signIn);
        toast.success("An email has been sent to your email address");
        successCb && successCb();
      })
      .catch((err) => {
        if (errorCallback) errorCallback(err);
      })
      .finally(() => {
        setAuthLoading(false);
      });
  };
  const verify = ({ pathParams }, cb, errorCallback) => {
    setForgotLoading(true);
    verifyOtp({ pathParams })
      .then(async (response) => {
        setForgotLoading(false);
        cb && cb(response, "success");
      })
      .catch((err) => {
        setForgotLoading(false);
        toast.error(err?.message);

        if (errorCallback) errorCallback(err, "error");
      });
  };
  const verifyUser = ({ pathParams }, cb, errorCallback) => {
    setForgotLoading(true);
    verifyToken({ pathParams })
      .then(async (response) => {
        setForgotLoading(false);
        cb && cb(response, "success");
      })
      .catch((err) => {
        setForgotLoading(false);
        toast.error(err?.message);

        if (errorCallback) errorCallback(err, "error");
      });
  };

  const values = {
    user,
    subscriptionActive,
    loading,
    authLoading,
    handleLogin,
    handleLogout,
    handleSignUp,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
