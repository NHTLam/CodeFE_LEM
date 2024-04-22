"use client";

import React from "react";
import { FileTable } from "../FileTable";

export const MakeEssay = ({ ParentCallBack }) => {
  const handlerProp = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    ParentCallBack(event.target.value);
  };

  return (
    <>
      <div className="w-full border-l pl-4">
        <p>Instruction: </p>
        <textarea
          rows={7}
          onChange={handlerProp}
          className="flex w-full grow rounded-sm border border-stroke px-2 py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5"
        ></textarea>

        <p className="mt-5">Scoring criteria: </p>
        <textarea
          rows={7}
          className="flex w-full grow rounded-sm border border-stroke px-2 py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5"
        ></textarea>

        <div className="mb-20 mt-5">
          <FileTable />
        </div>
      </div>
    </>
  );
};
