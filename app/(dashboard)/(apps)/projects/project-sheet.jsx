"use client";
import React, { useState, useEffect, useTransition } from "react";
import { toast } from "react-hot-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm, Controller } from "react-hook-form";
import Select, { components } from "react-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn, formatDate, formatISODate } from "@/lib/utils";
// import { addProjectAction, editProjectAction } from "@/action/project-action";
import { Button } from "@/components/ui/button";
import { Plus, Calendar as CalendarIcon } from "lucide-react";

import {
  Sheet,
  // SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select as UiSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { faker } from "@faker-js/faker";
const assignOption = [
  {
    value: "mahedi",
    label: "Mahedi Amin",
    image: faker.image.avatarLegacy(),
  },
  {
    value: "sovo",
    label: "Sovo Haldar",
    image: faker.image.avatarLegacy(),
  },
  {
    value: "rakibul",
    label: "Rakibul Islam",
    image: faker.image.avatarLegacy(),
  },
  {
    value: "pritom",
    label: "Pritom Miha",
    image: faker.image.avatarLegacy(),
  },
];
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { createProject, updateProject } from "@/services/projects";
const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

const OptionComponent = ({ data, ...props }) => {
  //const Icon = data.icon;

  return (
    <components.Option {...props}>
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8 ring-1 ring-border   ring-offset-background">
          <AvatarImage src={data.image} />
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
        <div className="text-sm font-medium text-default-900">{data.label}</div>
      </div>
    </components.Option>
  );
};
const schema = z.object({
  name: z.string().min(2, { message: "Your email is invalid." }),
  description: z.string().optional(),
  subtitle: z.string().optional(),
});

const ProjectsSheet = ({ open, project, onClose, selectedId, cb }) => {
  // form state
  const [priority, setPriority] = React.useState(null);
  const [assignee, setAssignee] = React.useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const ResetForm = async () => {
    reset();
  };

  const onSubmit = (data) => {
    data.priority = priority;
    data.assignee = null;
    data.start_date = formatISODate(new Date(startDate));
    data.end_date = endDate ? formatISODate(endDate) : null;
    const updatedProject = {
      // ...project,
      name: data.name,
      start_date: data.start_date,
      description: data.description,
      ...(data.assignee && { assignee: data.assignee }),
      ...(data.end_date && { end_date: data.end_date }),
    };
    var result;

    if (project) {
      startTransition(async () => {
        result = await updateProject(selectedId, updatedProject);
        toast.success("Successfully Updated");
        cb(result.project, true);
      });
    } else {
      startTransition(async () => {
        result = await createProject(data);
        toast.success("Successfully Added");
        cb(result);
      });
    }

    onClose();
    reset();
  };

  useEffect(() => {
    setValue("name", project?.name || "");
    setValue("description", project?.description || "");
    setValue("assignee", project?.assignee || []);
    setValue("priority", project?.priority || "");
    const parsedAssignDate = project?.start_date
      ? new Date(project.start_date)
      : null;
    const parsedDueDate = project?.end_date ? new Date(project.end_date) : null;
    // Set state for startDate and endDate
    setStartDate(parsedAssignDate);
    setEndDate(parsedDueDate);
  }, [open]);

  return (
    <>
      <Sheet open={open}>
        <SheetContent
          onClose={() => {
            ResetForm();
            onClose();
          }}
          className="px-6"
        >
          <SheetHeader className="px-0">
            <SheetTitle>
              {project ? "Edit " : "Create a new"} Project
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(100%-40px)]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4  mt-6">
                <div className="flex items-center gap-4">
                  <div className="text-xs font-medium text-default-600">
                    Thumbnail
                  </div>

                  <Controller
                    name="file"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Label
                          htmlFor="projectLogo"
                          className="h-12 w-12 flex justify-center items-center bg-default-100 rounded"
                        >
                          <Plus className="w-6 h-6 text-default-400" />
                        </Label>
                        <Input
                          type="file"
                          id="projectLogo"
                          className="hidden"
                        />
                      </>
                    )}
                  />
                </div>

                <div>
                  <Label htmlFor="projectName" className="mb-1.5">
                    Project Name
                  </Label>
                  <Input
                    type="text"
                    {...register("name")}
                    placeholder="Project Name"
                    className={cn("", {
                      "border-destructive focus:border-destructive":
                        errors.name,
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="mb-1.5">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Project Description"
                    {...register("description")}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="status" className="mb-1.5">
                      Status
                    </Label>
                    <Controller
                      name="status"
                      control={control}
                      render={({ field }) => (
                        <UiSelect>
                          <SelectTrigger>
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="todo">To do</SelectItem>
                            <SelectItem value="inprogress">
                              In Progress
                            </SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </UiSelect>
                      )}
                    />
                  </div>
                  <div>
                    <Label htmlFor="priority" className="mb-1.5">
                      Priority
                    </Label>
                    <Controller
                      name="priority"
                      control={control}
                      render={({ field }) => (
                        <UiSelect
                          defaultValue={priority}
                          onValueChange={(data) => setPriority(data)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </UiSelect>
                      )}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="assignee" className="mb-1.5">
                    Assign
                  </Label>
                  <Controller
                    name="assignee"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        onChange={(data) => setAssignee(data)}
                        options={assignOption}
                        className="react-select"
                        classNamePrefix="select"
                        isMulti
                        components={{
                          Option: OptionComponent,
                        }}
                        id="icon_s"
                      />
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="startDate" className="mb-1.5">
                      Start Date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-between text-left font-normal border-default-300 bg-background ",
                            !startDate && "text-muted-foreground"
                          )}
                        >
                          {startDate ? (
                            formatDate(startDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="h-4 w-4 " />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Controller
                          name="startDate"
                          control={control}
                          render={({ field }) => (
                            <Calendar
                              mode="single"
                              selected={startDate}
                              onSelect={setStartDate}
                              initialFocus
                            />
                          )}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label htmlFor="endDate" className="mb-1.5">
                      End Date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-between text-left font-normal border-default-300 bg-background",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          {endDate ? (
                            formatDate(endDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className=" h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Controller
                          name="endDate"
                          control={control}
                          render={({ field }) => (
                            <Calendar
                              mode="single"
                              selected={endDate}
                              onSelect={setEndDate}
                              initialFocus
                            />
                          )}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex gap-6">
                <Button
                  color="warning"
                  variant="soft"
                  className="flex-1"
                  onClick={() => {
                    onClose();
                  }}
                >
                  Cancel
                </Button>

                <Button type="submit" disabled={isPending} className="flex-1">
                  {project ? "Update" : "  Create  "} Project
                </Button>
              </div>
            </form>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ProjectsSheet;
