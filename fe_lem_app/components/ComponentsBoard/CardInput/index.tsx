"use client";

import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useRef, ElementRef } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { UpdateBoard } from "@/services/board-service";
import { Board } from "@/models/board";
import { Card } from "@/models/card";

interface CardInputProps {
  boardData: Board;
}
export const CardInput = ({ boardData }: CardInputProps) => {
  const params = useParams();

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [newCardName, setNewCardName] = useState("");

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

  const onSubmit = async () => {
    const card: Card = {
      name: newCardName,
    };
    if (boardData.cards === null) {
      boardData.cards = [];
    }
    boardData.cards!.push(card);
    const result = await UpdateBoard(boardData);
    window.location.reload();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCardName(event.target.value);
  };

  if (isEditing) {
    return (
      <li className="h-full w-[272px] shrink-0 select-none">
        <form
          ref={formRef}
          className="w-full space-y-4 rounded-md bg-white p-3 shadow-md"
        >
          <div>
            <input
              placeholder="Enter card name..."
              className="text-body-color dark:text-body-color-dark dark:shadow-two flex w-full grow rounded-sm border-b px-2 py-1.5 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
              onChange={handleChange}
            />
          </div>
          <input hidden value={params.boardId} name="boardId" />
          <div className="flex items-center gap-x-1">
            <button
              onClick={onSubmit}
              type="button"
              color="primary"
              className="my-1 flex w-full justify-center rounded-sm border border-stroke bg-blue-500 py-1 text-base text-white outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
            >
              Add a card
            </button>
            <button
              className="my-1 flex w-10 justify-center rounded-sm border border-stroke py-2 text-base outline-none transition-all duration-300 hover:border-rose-600 hover:bg-red-200/5 hover:text-red-600 dark:border-transparent dark:bg-red-200 dark:hover:border-rose-600 dark:hover:bg-red-200/5 dark:hover:text-red-600 dark:hover:shadow-none"
              onClick={disableEditing}
            >
              <X className="h-4 w-4" />
            </button>
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
        Add a card
      </button>
    </li>
  );
};
