"use client";

import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { PopoverClose } from "@radix-ui/react-popover";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
//import { useAction } from "@/hooks/useAction";
import { Button } from "@nextui-org/react";
//import { useProModal } from "@/hooks/use-pro-modal";
import { useForm } from "react-hook-form";

import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { FormPicker } from "./form-picker";
import { Create } from "@/services/board-service";
import { useAction } from "@/hooks/useAction";
import { Board } from "@/models/board";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
};

export const FormPopover = ({
  children,
  side = "bottom",
  align,
  sideOffset = 0,
}: FormPopoverProps) => {
  //const proModal = useProModal();
  const closeRef = useRef<ElementRef<"button">>(null);
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const [urlImg, setUrlImg] = useState("");
  
  const { execute } = useAction(Create, {
    onSuccess: () => {
      toast.success("Board created!");
      closeRef.current?.click();
      // router.push(`/board/${data.id}`);
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  const onSubmit = async () => {
    const name = getValues("name");
    const imageUrl = urlImg;
    const board = {name: name, imageUrl: imageUrl}
    await execute(board);
  };
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Create board
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
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
            id = "name"
            label="Board title"
            type="text"
            register={register}
            // errors={fieldErrors}
          />
          <FormSubmit className="w-full">
            Create
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};