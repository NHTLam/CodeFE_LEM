"use client";
import { useState } from "react";
import { Circle, Upload } from "lucide-react";
import { FileTable } from "@/components/ComponentsClassroomPage/FileTable";

const MakeEssayPage = () => {
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
        <p>Instruction: </p>
        <textarea
          rows={7}
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
export default MakeEssayPage;
