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
import { DeleteCard, DuplicateCard } from "@/services/board-service";

interface ListOptionsProps {
  data: Card;
  onAddCard: () => void;
}

export const ListOption = ({ data, onAddCard }: ListOptionsProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);
  var classroomId = "";
  if (typeof window !== "undefined") {
    classroomId = localStorage.getItem("classroomId") ?? "";
  }

  async function onDelete() {
    const result = await DeleteCard(data, classroomId);
    window.location.reload();
  }

  async function onCopy() {
    const result = await DuplicateCard(data, classroomId);
    window.location.reload();
  }

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
          Add job
        </button>
        <input hidden name="id" id="id" value={data.id} />
        <input hidden name="boardId" id="boardId" value={data.boardId} />
        <button
          onClick={onCopy}
          className="my-1 flex w-full justify-center rounded-sm border border-stroke py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
        >
          Duplicate Card
        </button>

        <input hidden name="id" id="id" value={data.id} />
        <input hidden name="boardId" id="boardId" value={data.boardId} />
        <button
          onClick={onDelete}
          className="my-1 flex w-full justify-center rounded-sm border border-stroke py-1 text-base outline-none transition-all duration-300 hover:border-rose-600 hover:bg-red-200/5 hover:text-red-600 dark:border-transparent dark:bg-red-200 dark:hover:border-rose-600 dark:hover:bg-red-200/5 dark:hover:text-red-600 dark:hover:shadow-none"
        >
          Delete this card
        </button>
      </PopoverContent>
    </Popover>
  );
};
