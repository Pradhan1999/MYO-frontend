import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { updateOrg } from "@/services/organization";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schema = z.object({
  name: z.string().min(3, { message: "Name is required" }),
  stregnth: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  phoneNumber: z.string().optional(),
  email: z.string().email().optional(),
  website: z.string().min(3, { message: "Website is required" }),
  logo: z.string().optional(),
});

const AddUpdateSession = ({ open, handleChange, data, clearData }) => {
  const {
    register,
    setValue,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const categories = [
    {
      label: "0-100",
      value: "0-100",
    },
    {
      label: "101-500",
      value: "101-500",
    },
    {
      label: "501-1000",
      value: "501-1000",
    },
    {
      label: "1001-10000",
      value: "1001-10000",
    },
  ];

  const onSubmit = (value) => {
    const payload = {
      name: value?.name,
      stregnth: value?.stregnth,
      address: value?.address,
      city: value?.city,
      state: value?.state,
      country: value?.country,
      phoneNumber: value?.phoneNumber,
      email: value?.email,
      website: value?.website,
      logoUrl: value?.logo,
    };
    updateOrg({ pathParams: { id: 1 }, body: payload })
      .then((res) => {
        toast.success("Updated successfully");
        handleChange(false);
        clearData();
      })
      .catch((err) => toast.error(err?.message ?? "Something went wrong"));
  };

  useEffect(() => {
    if (data && open) {
      setValue("name", data?.name);
      setValue("stregnth", data?.stregnth);
      setValue("address", data?.address);
      setValue("city", data?.city);
      setValue("state", data?.state);
      setValue("country", data?.country);
      setValue("phoneNumber", data?.phoneNumber);
      setValue("email", data?.email);
      setValue("website", data?.website);
      setValue("logo", data?.logoUrl);
    }
  }, [data, open, setValue]);

  return (
    <Dialog open={open} onOpenChange={handleChange}>
      <DialogContent size="2xl">
        <DialogHeader className="p-0">
          <DialogTitle className="text-base font-medium text-default-700 ">
            Edit Organization
          </DialogTitle>
        </DialogHeader>
        <div>
          <form className="h-full" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <ScrollArea className="h-full">
                <div className="sm:grid  sm:grid-cols-2 sm:gap-5 space-y-4 sm:space-y-0">
                  <div className="flex flex-col gap-2">
                    <Label>Name</Label>
                    <Input type="text" {...register("name")} />
                    {errors && (
                      <div className=" text-destructive">
                        {errors?.name?.message}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Strength</Label>
                    <Controller
                      name="stregnth"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Label" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem
                                value={category.value}
                                key={category.value}
                              >
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Address</Label>
                    <Input type="text" {...register("address")} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>City</Label>
                    <Input type="text" {...register("city")} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>State</Label>
                    <Input type="text" {...register("state")} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Country</Label>
                    <Input type="text" {...register("country")} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Phone Number</Label>
                    <Input type="text" {...register("phoneNumber")} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Email</Label>
                    <Input type="email" {...register("email")} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Website</Label>
                    <Input type="text" {...register("website")} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Logo Url</Label>
                    <Input type="text" {...register("logo")} />
                  </div>
                </div>
              </ScrollArea>
            </div>

            <div className=" flex justify-end gap-3 mt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddUpdateSession;
