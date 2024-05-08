"use client";

import React, { useEffect, useState } from "react";
import { FileTable } from "../FileTable";
import { toast } from "sonner";

export const MakeActivity = ({ ParentCallBack }) => {
  const [questionList, setQuestionList] = useState<any[]>([]);
  const [attachments, setAttachments] = useState<any>([]);

  useEffect(() => {
    ParentCallBack(questionList);
  }, [questionList, ParentCallBack]);

  const createQuestion = (data) => {
    setQuestionList([]);
    for (let index = 0; index < 1; index++) {
      setQuestionList((prev) => {
        const updated = [
          ...prev,
          {
            id: 0,
            name: `Activity`,
            description: data,
            correctAnswer: data,
            attachments: attachments,
          },
        ];

        return updated;
      });
    }
    console.log(data);
  };

  const dataChildren = (childData) => {
    setAttachments(childData);
    console.log(childData);
  };

  return (
    <>
      <div className="w-full border-l pl-4">
        <div className="mb-5 flex w-full">
          <div className="w-full">
            <div className="flex items-center">
              <p className="mr-5">Question: </p>
              <input
                onChange={(e) => {
                  createQuestion(e.target.value);
                }}
                className="flex w-full grow rounded-sm border border-stroke px-2 py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5"
              />
            </div>
          </div>
        </div>

        <div className="mb-20 mt-5">
          <FileTable ParentCallBack={dataChildren} data={[]} />
        </div>
      </div>
    </>
  );
};
