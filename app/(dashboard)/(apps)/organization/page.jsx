"use client";

import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import OrganizationTable from "./OrganizationTable";

export default function Organization() {
  return (
    <PageLayout
      title="Organization"
      breadcrumbs={[
        { name: "Dashboard", path: "/" },
        { name: "Organization", path: "/organization" },
      ]}
      primaryAction={
        <div className="flex justify-between">
          <div className="relative w-1/4">
            <Search className="w-4 h-4 text-default-400 absolute top-1/2 left-2 -translate-y-1/2" />
            <Input placeholder="Search..." className="pl-7" />
          </div>
          {/* <Button size="sm">Add New</Button> */}
        </div>
      }
    >
      {/* TABLE */}
      <div className="mt-4">
        <OrganizationTable />
      </div>
    </PageLayout>
  );
}
