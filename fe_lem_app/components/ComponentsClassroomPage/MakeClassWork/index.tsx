"use client";

import React, { Fragment, useEffect, useState } from "react";
import { redirect } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import { CheckIcon, ChevronDown, Circle, Upload } from "lucide-react";
import { Listbox, Transition } from "@headlessui/react";
import Link from "next/link";
import { FilterData } from "@/models/filter";
import { ListClassEvent } from "@/services/class-event-service";

export const MakeClassWork = () => {

    const DefautAnswer = {
        name: "A",
        answer: "Answer 1",
      };
    
      function upLoadFile() {
        console.log("Upload File");
      }
    
      function AddAnswer() {
        console.log("Upload File");
      }
    
      const [CurrentAnswers, setCurrentAnswers] = useState([]);

  return (
    <>
      <div className="w-full border-l pl-4">
        <p>Question: </p>
        <div className="flex border">
          <textarea className="flex w-full grow rounded-sm border border-stroke px-2 py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5"></textarea>
          <div className="grid w-2/3 grid-cols-1 border-l" onClick={upLoadFile}>
            <Upload className="mb-1 mt-5 h-10 w-10 place-self-center self-end" />
            <span className="mb-5 place-self-center self-start">
              Upload Picture
            </span>
          </div>
        </div>

        <div className="mt-5">
          <p>Answer:</p>
          <p className="ml-10">A. {DefautAnswer.answer}</p>
          <button
            onClick={AddAnswer}
            className="my-1 ml-10 flex w-30 justify-center rounded-sm border border-stroke py-1 text-base transition-all duration-300 hover:border-lime-800 hover:bg-lime-800/5 hover:text-lime-800 dark:border-transparent dark:bg-lime-800 dark:hover:border-lime-800 dark:hover:bg-lime-800/5 dark:hover:text-lime-800 dark:hover:shadow-none"
          >
            Add answer
          </button>
        </div>

        <p className="mt-5">Explain: </p>
        <textarea
          rows={5}
          className="flex w-full grow rounded-sm border border-stroke px-2 py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5"
        ></textarea>
        <hr className="mt-5" />

        <div className="mb-20 mt-5 border px-2 py-2">
          <div className="grid grid-cols-10">
            <p className="col-span-1">Question 1:</p>
            <p className="col-span-5 justify-start">Content</p>
            <div className="col-span-4 h-40 border">Picture</div>
          </div>
          <div className="mt-5 flex w-full justify-around">
            <div className="flex">
              <Circle className="mr-1 mt-1 h-4 w-4" />
              <p>Answer 1</p>
            </div>
            <div className="flex">
              <Circle className="mr-1 mt-1 h-4 w-4" />
              <p>Answer 2</p>
            </div>
            <div className="flex">
              <Circle className="mr-1 mt-1 h-4 w-4" />
              <p>Answer 3</p>
            </div>
            <div className="flex">
              <Circle className="mr-1 mt-1 h-4 w-4" />
              <p>Answer 4</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


