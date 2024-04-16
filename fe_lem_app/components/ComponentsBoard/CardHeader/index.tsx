"use client";

import { toast } from "sonner";
//import { List } from "@prisma/client";
import { useEventListener } from "usehooks-ts";
import { useState, useRef, ElementRef } from "react";

//import { useAction } from "@/hooks/use-action";
//import { updateList } from "@/actions/update-list";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/Form/form-input";
import { ListOption } from "@/components/ComponentsBoard/ListOption";
import { Card } from "@/models/card";

interface CardHeaderProps {
  data: Card;
  onAddCard: () => void;
}

export const CardHeader = ({ data, onAddCard }: CardHeaderProps) => {
  const [title, setTitle] = useState(data.name);
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  //   const { execute } = useAction(updateList, {
  //     onSuccess: (data) => {
  //       toast.success(`Renamed to "${data.title}"`);
  //       setTitle(data.title);
  //       disableEditing();
  //     },
  //     onError: (error) => {
  //       toast.error(error);
  //     }
  //   });

  // const handleSubmit = (formData: FormData) => {
  //   const title = formData.get("title") as string;
  //   const id = formData.get("id") as string;
  //   const boardId = formData.get("boardId") as string;

  //   if (title === data.title) {
  //     return disableEditing();
  //   }

  //   // execute({
  //   //   title,
  //   //   id,
  //   //   boardId,
  //   // });
  // };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener("keydown", onKeyDown);

  return (
    <div className="items-start- flex justify-between gap-x-2 px-2 pt-2 text-sm font-semibold">
      {isEditing ? (
        <form
          ref={formRef}
          // action={handleSubmit}
          className="flex-1 px-[2px]"
        >
          <input hidden id="id" name="id" value={data.id} />
          <input hidden id="boardId" name="boardId" value={data.boardId} />
          <FormInput
            ref={inputRef}
            //onBlur={onBlur}
            id="title"
            placeholder="Enter list title.."
            defaultValue={title}
            className="hover:border-input focus:border-input h-7 truncate border-transparent bg-transparent px-[7px] py-1 text-sm font-medium transition focus:bg-white"
            register={register}
          />
          <button type="submit" hidden />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="h-7 w-full border-transparent px-2.5 py-1 text-sm font-medium"
        >
          {title}
        </div>
      )}
      <ListOption onAddCard={onAddCard} data={data} />
    </div>
  );
};
