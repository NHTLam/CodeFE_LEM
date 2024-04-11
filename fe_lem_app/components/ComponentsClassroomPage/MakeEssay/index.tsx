"use client";

import React, { Fragment, useEffect, useState } from "react";
import { redirect } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import { CheckIcon, ChevronDown, Circle, Upload } from "lucide-react";
import { Listbox, Transition } from "@headlessui/react";
import Link from "next/link";
import { FilterData } from "@/models/filter";
import { ListClassEvent } from "@/services/classevent-service";
import { FileTable } from "../FileTable";

export const MakeClassWork = () => {

      const [instruction, setInstruction] = useState<any>();

  return (
    <>
      <div className="w-full border-l pl-4">
        <p>Instruction: </p>
        <textarea
          rows={7}
          onChange={e => setInstruction(e.target.value)}
          className="flex w-full grow rounded-sm border border-stroke px-2 py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5"
        ></textarea>

        <p className="mt-5">Scoring criteria: </p>
        <textarea
          rows={7}
          className="flex w-full grow rounded-sm border border-stroke px-2 py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5"
        ></textarea>

        <p className="mt-5">Attached files: </p>
        <div className="mb-20">
          <FileTable />
        </div>
      </div>
    </>
  );
};


