import React from "react";

import Card from "@/components/ui/card-snippet";
import VStepForm from "./vstep-form";

const Page = () => {
  return (
    <Card title="Please finish setting up your organization">
      <VStepForm />
    </Card>
  );
};

export default Page;
