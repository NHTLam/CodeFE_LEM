"use client";

import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";
import { PopoverClose } from "@radix-ui/react-popover";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
//import { useAction } from "@/hooks/useAction";
import { Button } from "@nextui-org/react";
//import { useProModal } from "@/hooks/use-pro-modal";
import { useForm } from "react-hook-form";

import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { FormPicker } from "./form-picker";
import { CreateBoard } from "@/services/board-service";
import { Board } from "@/models/board";
import { CreateClass } from "@/services/class-service";
import { Classroom } from "@/models/classroom";
import { AppUserClassroomMapping } from "@/models/appUserClassroomMapping";
import { AppUserBoardMapping } from "@/models/appUserBoardMapping";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  isForBoard: boolean;
  classroomData: Classroom[] | null;
  boardData: Board[] | null;
  classroomIdForBoard: number;
}

export const FormPopover = ({
  children,
  side = "bottom",
  align,
  sideOffset = 0,
  isForBoard,
  classroomData,
  boardData,
  classroomIdForBoard,
}: FormPopoverProps) => {
  //const proModal = useProModal();
  var currentUserId = "";
  if (typeof window !== "undefined") {
    currentUserId = localStorage.getItem("userId") ?? "";
  }
  const closeRef = useRef<ElementRef<"button">>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const [urlImg, setUrlImg] = useState("");

  const onSubmit = async () => {
    const name = getValues("name");
    const imageUrl = urlImg;

    var appUserClassroomMappings: AppUserClassroomMapping[] = [];
    if (classroomData !== null) {
      const classroomIds = classroomData.map((x) => x.id);
      for (let i = 0; i < classroomIds.length; i++) {
        var appUserClassroomMapping: AppUserClassroomMapping = {
          id: 0,
          appUserId: Number(currentUserId),
          classroomId: classroomIds[i],
        };
        appUserClassroomMappings.push(appUserClassroomMapping);
      }
    }
    var appUserClassroomMapping: AppUserClassroomMapping = {
      id: 0,
      appUserId: Number(currentUserId),
      classroomId: 0,
    };
    appUserClassroomMappings.push(appUserClassroomMapping);

    var appUserBoardMappings: AppUserBoardMapping[] = [];
    if (boardData !== null) {
      const boardIds = boardData.map((x) => x.id);
      for (let i = 0; i < boardIds.length; i++) {
        var appUserBoardMapping: AppUserBoardMapping = {
          id: 0,
          appUserId: Number(currentUserId),
          boardId: boardIds[i]!,
          appUserTypeId: 2,
        };
        appUserBoardMappings.push(appUserBoardMapping);
      }
    }
    var appUserBoardMapping: AppUserBoardMapping = {
      id: 0,
      appUserId: Number(currentUserId),
      boardId: 0,
      appUserTypeId: 2,
    };
    appUserBoardMappings.push(appUserBoardMapping);

    const newBoardData = {
      name: name,
      imageUrl: imageUrl,
      appUserBoardMappings: appUserBoardMappings,
      classroomId: classroomIdForBoard,
    };
    const newClassData = {
      name: name,
      imageUrl: imageUrl,
      appUserClassroomMappings: appUserClassroomMappings,
    };

    if (isForBoard) {
      await CreateBoard(newBoardData);
      window.location.reload();
    } else {
      await CreateClass(newClassData);
      window.location.reload();
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="pb-4 text-center text-sm font-medium text-neutral-600">
          {isForBoard === true ? <>Create Board</> : <>Create Class</>}
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="absolute right-2 top-2 h-auto w-auto p-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormPicker
            id="imageUrl"
            setUrlImg={setUrlImg}
            // errors={fieldErrors}
          />
          <FormInput
            id="name"
            label="Board title"
            type="text"
            register={register}
            // errors={fieldErrors}
          />
          <div className="mt-3">
            <FormSubmit>Create</FormSubmit>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};
