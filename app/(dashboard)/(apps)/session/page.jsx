"use client";

import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import SessionTable from "./SessionTable";

export default function Session() {
  return (
    <PageLayout
      title="Session"
      breadcrumbs={[
        { name: "Dashboard", path: "/" },
        { name: "Session", path: "/session" },
      ]}
      primaryAction={
        <div className="flex justify-between">
          <div className="relative w-1/4">
            <Search className="w-4 h-4 text-default-400 absolute top-1/2 left-2 -translate-y-1/2" />
            <Input placeholder="Search..." className="pl-7" />
          </div>
          <Button size="sm">Add</Button>
        </div>
      }
    >
      {/* TABLE */}
      <div className="mt-4">
        <SessionTable />
      </div>
    </PageLayout>
  );
}
