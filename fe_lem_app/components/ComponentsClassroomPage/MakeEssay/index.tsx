"use client";

import React, { useEffect, useState } from "react";
import { FileTable } from "../FileTable";
import { toast } from "sonner";

export const MakeEssay = ({ ParentCallBack }) => {
  const [instruction, setInstruction] = useState<object>({});
  const [description, setDescription] = useState<object>({});
  const [current, setCurrent] = useState<number>(0);
  const [currentList, setCurrentList] = useState<any[]>([]);
  const [questionList, setQuestionList] = useState<any[]>([]);
  const [attachments, setAttachments] = useState<any>([]);

  const addQuestion = () => {
    setCurrent(current + 1);
    setCurrentList([...currentList, current]);
  };

  useEffect(() => {
    ParentCallBack(questionList);
  }, [questionList, ParentCallBack]);

  const createQuestion = (isNoti) => {
    setQuestionList([]);
    for (let index = 0; index < current; index++) {
      setQuestionList((prev) => {
        const updated = [
          ...prev,
          {
            id: 0,
            name: `Question ${index + 1}`,
            instruction: instruction[index] ?? "",
            description: description[index],
            correctAnswer: instruction[index],
            attachments: attachments,
          },
        ];

        return updated;
      });
    }
    if (isNoti) {
      toast.success("Create success", {
        style: {
          color: "green",
        },
      });
    }
  };

  const dataChildren = (childData) => {
    setAttachments(childData);
    const isNoti = false;
    createQuestion(isNoti);
    console.log(childData);
  };

  return (
    <>
      <div className="w-full border-l pl-4">
        {currentList.map((index) => (
          <div key={index} className="mb-5 flex w-full">
            <p className="w-20">Question {index + 1}:</p>
            <div className="w-full">
              <div className="flex">
                <p className="mr-5">Question: </p>
                <textarea
                  onChange={(e) => {
                    setDescription((prev) => {
                      const updated = { ...prev };
                      updated[index] = e.target.value;
                      console.log(updated);
                      return updated;
                    });
                  }}
                  className="flex w-full grow rounded-sm border border-stroke px-2 py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5"
                />
              </div>
              <div className="mt-5 flex w-full">
                <p className="mr-2">Instruction: </p>
                <textarea
                  onChange={(e) => {
                    setInstruction((prev) => {
                      const updated = { ...prev };
                      updated[index] = e.target.value;
                      console.log(updated);
                      return updated;
                    });
                  }}
                  className="flex w-full grow rounded-sm border border-stroke px-2 py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5"
                />
              </div>
            </div>
          </div>
        ))}
        <div className="flex w-full justify-end">
          <button
            onClick={() => createQuestion(true)}
            className="my-1 mr-5 mt-6 flex w-50 justify-center rounded-sm border border-stroke py-1 text-base transition-all duration-300 hover:border-lime-800 hover:bg-lime-800/5 hover:text-lime-800 dark:border-transparent dark:bg-lime-800 dark:hover:border-lime-800 dark:hover:bg-lime-800/5 dark:hover:text-lime-800 dark:hover:shadow-none"
          >
            Save
          </button>
          <button
            onClick={addQuestion}
            className="my-1 mt-6 flex w-50 justify-center rounded-sm border border-stroke py-1 text-base transition-all duration-300 hover:border-lime-800 hover:bg-lime-800/5 hover:text-lime-800 dark:border-transparent dark:bg-lime-800 dark:hover:border-lime-800 dark:hover:bg-lime-800/5 dark:hover:text-lime-800 dark:hover:shadow-none"
          >
            Add Question
          </button>
        </div>

        <div className="mb-20 mt-5">
          <FileTable ParentCallBack={dataChildren} data={[]} />
        </div>
      </div>
    </>
  );
};
