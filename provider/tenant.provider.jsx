"use client";

// ** React Imports
import { createContext, useEffect, useState } from "react";

// ** Next Import
// import { useRouter } from 'next/router';

// ** Config
import { getOrganizationDetails } from "@/services/organization";

// ** Defaults
const defaultProvider = {
  tenant: null,
  loading: true,
};
const TenantContext = createContext(defaultProvider);

const TenantProvider = ({ children }) => {
  // ** States
  const [tenant, setTenant] = useState(defaultProvider.tenant);
  const [loading, setLoading] = useState(defaultProvider.loading);

  // ** Hooks
  // const router = useRouter();

  useEffect(() => {
    const initGetTenant = async () => {
      setLoading(true);
      getOrganizationDetails().then(async (response) => {
        setLoading(false);
        setTenant({ ...response });
      });
    };
    initGetTenant();
  }, []);

  const values = {
    tenant,
    loading,
  };

  return (
    <TenantContext.Provider value={values}>{children}</TenantContext.Provider>
  );
};

export { TenantContext, TenantProvider };
