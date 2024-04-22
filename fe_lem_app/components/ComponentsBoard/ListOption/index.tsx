"use client";

import { toast } from "sonner";
//import { List } from "@prisma/client";
import { ElementRef, useRef } from "react";
import { MoreHorizontal, X } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
//import { useAction } from "@/hooks/use-action";
//import { copyList } from "@/actions/copy-list";
//import { deleteList } from "@/actions/delete-list";
import { FormSubmit } from "@/components/Form/form-submit";
import { PopoverClose } from "@radix-ui/react-popover";
import { Button } from "@nextui-org/react";
import { Card } from "@/models/card";

interface ListOptionsProps {
  data: Card;
  onAddCard: () => void;
}

export const ListOption = ({ data, onAddCard }: ListOptionsProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  //   const { execute: executeDelete } = useAction(deleteList, {
  //     onSuccess: (data) => {
  //       toast.success(`List "${data.title}" deleted`);
  //       closeRef.current?.click();
  //     },
  //     onError: (error) => {
  //       toast.error(error);
  //     }
  //   });

  //   const { execute: executeCopy } = useAction(copyList, {
  //     onSuccess: (data) => {
  //       toast.success(`List "${data.title}" copied`);
  //       closeRef.current?.click();
  //     },
  //     onError: (error) => {
  //       toast.error(error);
  //     }
  //   });

  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    //executeDelete({ id, boardId });
  };

  const onCopy = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    //executeCopy({ id, boardId });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="bg-white">
        <div className="pb-4 text-center text-sm font-medium text-neutral-600">
          List actions
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="absolute right-2 top-2 h-auto w-auto p-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <button
          onClick={onAddCard}
          className="my-1 flex w-full justify-center rounded-sm border border-stroke py-1 text-base outline-none transition-all duration-300 hover:border-lime-800 hover:bg-lime-800/5 hover:text-lime-800 dark:border-transparent dark:bg-lime-800 dark:hover:border-lime-800 dark:hover:bg-lime-800/5 dark:hover:text-lime-800 dark:hover:shadow-none"
        >
          Add card
        </button>
        <form action={onCopy}>
          <input hidden name="id" id="id" value={data.id} />
          <input hidden name="boardId" id="boardId" value={data.boardId} />
          <button
            type="submit"
            className="my-1 flex w-full justify-center rounded-sm border border-stroke py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
          >
            Duplicate List
          </button>
        </form>
        <form action={onDelete}>
          <input hidden name="id" id="id" value={data.id} />
          <input hidden name="boardId" id="boardId" value={data.boardId} />
          <button
            type="submit"
            className="my-1 flex w-full justify-center rounded-sm border border-stroke py-1 text-base outline-none transition-all duration-300 hover:border-rose-600 hover:bg-red-200/5 hover:text-red-600 dark:border-transparent dark:bg-red-200 dark:hover:border-rose-600 dark:hover:bg-red-200/5 dark:hover:text-red-600 dark:hover:shadow-none"
          >
            Delete this list
          </button>
        </form>
      </PopoverContent>
    </Popover>
  );
};
