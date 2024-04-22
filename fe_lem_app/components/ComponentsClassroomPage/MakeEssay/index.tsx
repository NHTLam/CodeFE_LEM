"use client";

import React, { Fragment, useEffect, useState } from "react";
import { redirect } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import { CheckIcon, ChevronDown, Circle, Upload } from "lucide-react";
import { Listbox, Transition } from "@headlessui/react";
import Link from "next/link";
import { FilterData } from "@/models/filter";
import { ListClassEvent } from "@/services/class-event-service";
import { FileTable } from "../FileTable";

export const MakeEssay = ({ParentCallBack}) => {

  const [instruction, setInstruction] = useState<object>({});
  const [description, setDescription] = useState<object>({});
  const [current, setCurrent] = useState<number>(0);
  const [currentList, setCurrentList] = useState<any[]>([]);
  const [questionList, setQuestionList] = useState<any[]>([]);

  const addQuestion = () => {
    setCurrent(current + 1);
    setCurrentList([...currentList, current]);
  }

  useEffect(() => {
    ParentCallBack(questionList);
  }, [questionList, ParentCallBack]);
  
  const createQuestion = () => {
    for (let index = 0; index < current; index++) {
      setQuestionList((prev) => {
        const updated = [ ...prev, {
          id: 0,
          name: `Câu ${index + 1}`,
          instruction: instruction[index],
          description: description[index],
          correctAnswer: instruction[index],
        } ];
  
        return updated;
      });
    }
  }

  return (
    <>
      <div className="w-full border-l pl-4">
      {currentList.map((index) => (
        <div key={index} className="flex mb-5 items-center">
          <p className="w-40">Câu {index + 1}:</p>
          <div className="flex w-full items-center mr-10">
            <p className="mr-2">Instruction: </p>
            <input
              onChange={e => {
                setInstruction((prev) => {
                  const updated = { ...prev };
                  updated[index] = e.target.value;
                  console.log(updated);   
                  return updated;
                })
              }}
              className="flex w-full grow rounded-sm border border-stroke px-2 py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5"
            />
          </div>
          <div className="flex w-full items-center">
            <p className="mr-2">Description: </p>
            <input
              onChange={e => {
                setDescription((prev) => {
                  const updated = { ...prev };
                  updated[index] = e.target.value;
                  console.log(updated);   
                  return updated;
                })
              }}
              className="flex w-full grow rounded-sm border border-stroke px-2 py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5"
            />
          </div>
        </div>
      ))}
        <div className="w-full flex justify-end">
          <button
            onClick={createQuestion}
            className="mr-5 my-1 flex w-50 mt-6 justify-center rounded-sm border border-stroke py-1 text-base transition-all duration-300 hover:border-lime-800 hover:bg-lime-800/5 hover:text-lime-800 dark:border-transparent dark:bg-lime-800 dark:hover:border-lime-800 dark:hover:bg-lime-800/5 dark:hover:text-lime-800 dark:hover:shadow-none">
            Submit
          </button>
          <button
            onClick={addQuestion}
            className="my-1 flex w-50 mt-6 justify-center rounded-sm border border-stroke py-1 text-base transition-all duration-300 hover:border-lime-800 hover:bg-lime-800/5 hover:text-lime-800 dark:border-transparent dark:bg-lime-800 dark:hover:border-lime-800 dark:hover:bg-lime-800/5 dark:hover:text-lime-800 dark:hover:shadow-none">
            Add Question
          </button>
        </div>

        <p className="mt-5">Attached files: </p>
        <div className="mb-20">
          <FileTable />
        </div>
      </div>
    </>
  );
};


