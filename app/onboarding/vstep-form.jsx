"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

import { Stepper, Step, StepLabel } from "@/components/ui/steps";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useContext";

const schema = z.object({
  name: z.string().min(4),
  email: z.string().email({ message: "Your email is invalid." }),
  phone: z.string().optional(),
  website: z.string().optional(),
});

const VStepForm = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");
  const isMobileView = useMediaQuery("(max-width: 768px)");

  const steps = [
    {
      label: "Basic Details",
      content: "Set up your organization basic details",
    },
    {
      label: "Branding",
      content: "Add your organization branding information",
    },
  ];

  const isStepOptional = (step) => {
    return step === 1;
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      website: "",
    },
  });

  console.log("errors: ", errors);
  const { handleSignUp, authLoading } = useAuth();

  const onSubmit = (values) => {
    console.log("submit values: ", values);
    handleSignUp();
  };

  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-12">
        <div className="max-w-[1024px] m-auto">
          <Stepper
            current={activeStep}
            direction={isMobileView ? "vertical" : "horizontal"}
          >
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <StepLabel variant="caption">Optional</StepLabel>
                );
              }
              return (
                <Step key={index} {...stepProps}>
                  <StepLabel {...labelProps}>
                    <div className="flex flex-col">
                      <span> {label.label}</span>
                      <span> {label.content}</span>
                    </div>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </div>
      </div>
      <div className="col-span-12">
        {activeStep === steps.length ? (
          <React.Fragment>
            <div className="mt-2 mb-2 font-semibold text-center">
              All steps completed - you&apos;re finished
            </div>
            <div className="flex pt-2">
              <div className=" flex-1" />
              <Button
                size="xs"
                variant="outline"
                color="destructive"
                className="cursor-pointer"
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-12 gap-4">
                {activeStep === 0 && (
                  <>
                    <div className="col-span-12 ">
                      <h4 className="text-sm font-medium text-default-600">
                        Enter Organization Details
                      </h4>
                      <p className="text-xs text-default-600 mt-1">
                        Fill in the box with correct data
                      </p>
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <Label
                        htmlFor="name"
                        className="mb-2 font-medium text-default-600"
                      >
                        Name{" "}
                      </Label>
                      <Input
                        {...register("name")}
                        type="text"
                        id="name"
                        className={cn("", {
                          // "border-destructive": errors?.name,
                        })}
                        placeholder="Enter Organization Name"
                        size={!isDesktop2xl ? "xl" : "lg"}
                      />
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <Label
                        htmlFor="email"
                        className="mb-2 font-medium text-default-600"
                      >
                        Email{" "}
                      </Label>
                      <div className="relative">
                        <Input
                          {...register("email")}
                          type="email"
                          id="email"
                          className={cn("peer", {
                            "border-destructive": errors?.email,
                          })}
                          placeholder="Enter Organization Official Email"
                          size={!isDesktop2xl ? "xl" : "lg"}
                        />
                      </div>
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <Label
                        htmlFor="phone"
                        className="mb-2 font-medium text-default-600"
                      >
                        Phone{" "}
                      </Label>
                      <div className="relative">
                        <Input
                          {...register("phone")}
                          type="text"
                          id="phone"
                          placeholder="Enter Organization Official Phone"
                          className="peer "
                          size={!isDesktop2xl ? "xl" : "lg"}
                        />
                      </div>
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <Label
                        htmlFor="website"
                        className="mb-2 font-medium text-default-600"
                      >
                        Website{" "}
                      </Label>
                      <div className="relative">
                        <Input
                          {...register("website")}
                          type="text"
                          id="website"
                          placeholder="Enter Organization Official Website"
                          className="peer "
                          size={!isDesktop2xl ? "xl" : "lg"}
                        />
                      </div>
                    </div>
                  </>
                )}

                {activeStep === 1 && (
                  <>
                    <div className="col-span-12 ">
                      <h4 className="text-sm font-medium text-default-600">
                        Enter Branding Information
                      </h4>
                      <p className="text-xs text-default-600 mt-1">
                        Fill in the box with correct data
                      </p>
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <Input
                        type="text"
                        placeholder="http://facebook.com/abc"
                      />
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <Input type="text" placeholder="http://twitter.com/abc" />
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <Input
                        type="text"
                        placeholder="http://linkedin.com/abc"
                      />
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <Input type="text" placeholder="http://youtube.com/abc" />
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <Input
                        type="text"
                        placeholder="http://instagram.com/abc"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="flex pt-2 ">
                <Button
                  size="xs"
                  variant="outline"
                  color="secondary"
                  className={cn("cursor-pointer", {
                    hidden: activeStep === 0,
                  })}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <div className="flex-1	gap-4 " />
                <div className="flex	gap-2 ">
                  {activeStep === steps.length - 1 ? (
                    <>
                      <Button
                        className="w-full"
                        disabled={authLoading}
                        size={!isDesktop2xl ? "lg" : "md"}
                      >
                        {authLoading && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {authLoading ? "Loading..." : "Submit"}
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="xs"
                      variant="outline"
                      color="secondary"
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNext();
                      }}
                    >
                      Next
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default VStepForm;
