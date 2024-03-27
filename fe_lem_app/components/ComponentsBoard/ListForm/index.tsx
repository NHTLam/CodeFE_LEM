"use client";

import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useRef, ElementRef } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

//import { useAction } from "@/hooks/use-action";
//import { createList } from "@/actions/create-list";
import { FormInput } from "@/components/Form/form-input";
import { FormSubmit } from "@/components/Form/form-submit";
import { Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";

export const ListForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const router = useRouter();
  const params = useParams();

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  // const { execute, fieldErrors } = useAction(createList, {
  //   onSuccess: (data) => {
  //     toast.success(`List "${data.title}" created`);
  //     disableEditing();
  //     router.refresh();
  //   },
  //   onError: (error) => {
  //     toast.error(error);
  //   },
  // });

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;

    // execute({
    //   title,
    //   boardId
    // });
  };

  if (isEditing) {
    return (
      <li className="h-full w-[272px] shrink-0 select-none">
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full space-y-4 rounded-md bg-white p-3 shadow-md"
        >
          <FormInput
            ref={inputRef}
            //errors={fieldErrors}
            id="title"
            className="hover:border-input focus:border-input h-7 border-transparent px-2 py-1 text-sm font-medium transition"
            placeholder="Enter list title..."
            register={register}
          />
          <input hidden value={params.boardId} name="boardId" />
          <div className="flex items-center gap-x-1">
            <FormSubmit>Add list</FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className="h-full w-[272px] shrink-0 select-none">
      <button
        onClick={enableEditing}
        className="flex w-full items-center rounded-md bg-white/80 p-3 text-sm font-medium transition hover:bg-white/50"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add a list
      </button>
    </li>
  );
};
