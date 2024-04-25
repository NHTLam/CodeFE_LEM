"use client";

import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import { forwardRef, useRef, ElementRef, useState } from "react";
import { useParams } from "next/navigation";
import { useOnClickOutside, useEventListener } from "usehooks-ts";
import { Button } from "@nextui-org/react";
import { CreateJob } from "@/services/job-service";
import { Job } from "@/models/job";

interface JobFormProps {
  cardId: number;
  enableEditing: () => void;
  disableEditing: () => void;
  isEditing: boolean;
}

export const JobForm = forwardRef<HTMLTextAreaElement, JobFormProps>(
  ({ cardId, enableEditing, disableEditing, isEditing }, ref) => {
    var classroomId = "";
    if (typeof window !== "undefined") {
      classroomId = localStorage.getItem("classroomId") ?? "";
    }
    const params = useParams();
    const formRef = useRef<ElementRef<"form">>(null);
    const [jobName, setJobName] = useState("");

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        disableEditing();
      }
    };

    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", onKeyDown);

    const onSubmit = async () => {
      const job: Job = {
        cardId: cardId,
        name: jobName,
      };
      const result = await CreateJob(job, classroomId);
      if (result === null) {
        toast.error("Create job fail", {
          style: {
            color: "red",
          },
        });
      } else {
        toast.success("Create job success", {
          style: {
            color: "green",
          },
        });
        window.location.reload();
      }
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setJobName(event.target.value);
    };

    if (isEditing) {
      return (
        <form ref={formRef} className="m-1 space-y-4 px-1 py-0.5">
          <textarea
            className="text-body-color dark:text-body-color-dark dark:shadow-two flex w-full grow rounded-sm border border-stroke px-2 py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
            placeholder="Enter a title for this card..."
            onChange={handleChange}
          />
          <div className="flex items-center gap-x-1">
            <button
              onClick={onSubmit}
              type="button"
              color="primary"
              className="my-1 flex w-full justify-center rounded-sm border border-stroke bg-blue-500 py-1 text-base text-white outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
            >
              Add job
            </button>
            <button
              className="my-1 flex w-10 justify-center rounded-sm border border-stroke py-2 text-base outline-none transition-all duration-300 hover:border-rose-600 hover:bg-red-200/5 hover:text-red-600 dark:border-transparent dark:bg-red-200 dark:hover:border-rose-600 dark:hover:bg-red-200/5 dark:hover:text-red-600 dark:hover:shadow-none"
              onClick={disableEditing}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </form>
      );
    }

    return (
      <div className="px-2 pt-2">
        <Button
          onClick={enableEditing}
          className="text-muted-foreground h-auto w-full justify-start px-2 py-1.5 text-sm"
          size="sm"
          variant="ghost"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add a job
        </Button>
      </div>
    );
  },
);

JobForm.displayName = "JobForm";
