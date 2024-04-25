"use client";
import { useEffect, useState } from "react";
import { Circle, ClipboardPen, Upload } from "lucide-react";
import Link from "next/link";
import { FeedBackTable } from "@/components/ComponentsClassroomPage/FeedbackTable";
import { FileTable } from "@/components/ComponentsClassroomPage/FileTable";
import { GetClassEvent } from "@/services/class-event-service";
import { FilterData } from "@/models/filter";
import { UpdateQuestion } from "@/services/question-service";
import { CreateStudentAnswer } from "@/services/student-answer-service";
import { toast } from "sonner";

interface WorkIdPageProps {
  params: {
    doId: string;
  };
}

const DoEssayPage = ({ params }: WorkIdPageProps) => {
  const [classWork, setClassWork] = useState<any>();
  const [first, setFirst] = useState<any>(true);
  const [previous, setPrevious] = useState<any>("");
  const [next, setNext] = useState<any>("");
  const [current, setCurrent] = useState<number>(0);
  const [studentAnswer, setStudentAnswer] = useState<object>({});
  const [currentValue, setCurrentValue] = useState<any>();

  var classroomId = "";
  var appUserId = "";
  if (typeof window !== "undefined") {
    classroomId = localStorage.getItem("classroomId") ?? "";
    appUserId = localStorage.getItem("userId") ?? "";
  }

  const filter: any = {
    id: parseInt(params.doId),
    code: "",
    name: "",
  };

  useEffect(() => {
    if (first == true) {
      const fetchData = async () => {
        const data = await GetClassEvent(filter);
        setClassWork(data);
        console.log("classWork: " + classWork);
      };
      fetchData();
      setFirst(false);
    }
  }, []);

  const submitAnswer = async () => {
    for (let index = 0; index < classWork?.questions.length; index++) {
      await CreateStudentAnswer({
        appUserId: Number(appUserId) == 0 ? 1 : Number(appUserId),
        questionId: classWork?.questions[index].id,
        name: studentAnswer[index] || "",
      });
    }
    window.location.href = `/lem/classroom/${classroomId}/class-work`;
    toast.success("Create question success", {
      style: {
        color: "green",
      },
    });
  };

  const SwapPage = (num) => {
    if (Array.isArray(classWork?.questions)) {
      if (num == 0) {
        if (current == 0) {
          setCurrent(classWork?.questions.length - 1);
        } else {
          setCurrent(current - 1);
        }
      } else if (num == 1) {
        if (current == classWork?.questions.length - 1) {
          setCurrent(0);
        } else {
          setCurrent(current + 1);
        }
      }
    }
    setCurrentValue("");
  };

  return (
    <>
      <div className="mx-5">
        <div className="mb-8 flex">
          <Link href = {`/lem/classroom/${classroomId}/class-work`}>
            <button className="my-1 mr-10 flex w-30 justify-center rounded-sm border border-stroke py-1 text-base outline-none transition-all duration-300 hover:border-rose-600 hover:bg-red-200/5 hover:text-red-600 dark:border-transparent dark:bg-red-200 dark:hover:border-rose-600 dark:hover:bg-red-200/5 dark:hover:text-red-600 dark:hover:shadow-none">
              Cancel
            </button>
          </Link>
          <button
            onClick={submitAnswer}
            className="my-1 flex w-30 justify-center rounded-sm border border-stroke py-1 text-base outline-none transition-all duration-300 hover:border-lime-800 hover:bg-lime-800/5 hover:text-lime-800 dark:border-transparent dark:bg-lime-800 dark:hover:border-lime-800 dark:hover:bg-lime-800/5 dark:hover:text-lime-800 dark:hover:shadow-none"
          >
            Submit
          </button>
        </div>
        <div className="flex items-center justify-between text-2xl font-semibold text-blue-500">
          <div className="flex">
            <ClipboardPen className="mr-2 h-10 w-10" />
            <p>{classWork?.questions[current].name}</p>
          </div>
          <div className="flex">
            <button
              onClick={() => SwapPage(0)}
              className="my-1 flex w-30 justify-center rounded-sm border border-stroke py-1 text-base outline-none transition-all duration-300 hover:border-lime-800 hover:bg-lime-800/5 hover:text-lime-800 dark:border-transparent dark:bg-lime-800 dark:hover:border-lime-800 dark:hover:bg-lime-800/5 dark:hover:text-lime-800 dark:hover:shadow-none"
            >
              Previous
            </button>
            <button
              onClick={() => SwapPage(1)}
              className="my-1 ml-20 flex w-30 justify-center rounded-sm border border-stroke py-1 text-base outline-none transition-all duration-300 hover:border-lime-800 hover:bg-lime-800/5 hover:text-lime-800 dark:border-transparent dark:bg-lime-800 dark:hover:border-lime-800 dark:hover:bg-lime-800/5 dark:hover:text-lime-800 dark:hover:shadow-none"
            >
              Next
            </button>
          </div>
        </div>
        <p className="mx-2 mt-5 font-bold">Description:</p>
        <p className="mx-2">{classWork?.questions[current].description}</p>
      </div>
      <hr className="mx-7 my-4" />
      <div className="mx-5">
        <p className="mx-2 mt-5 font-bold">Instruction:</p>
        <p className="mx-2">{classWork?.questions[current].instruction}</p>
      </div>
      <div className="mx-7 my-5 rounded-md">
        <textarea
          rows={20}
          placeholder="Answer"
          value={studentAnswer[current] || ""}
          onChange={(e) => {
            setStudentAnswer((prevAnswer) => {
              const updatedAnswer = { ...prevAnswer };
              updatedAnswer[current] = e.target.value;
              console.log(updatedAnswer);
              return updatedAnswer;
            });
          }}
          className="flex w-full grow rounded-sm border border-stroke px-2 py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5"
        ></textarea>
      </div>
      <div className="mx-8 mb-5">
        <FileTable />
      </div>
    </>
  );
};
export default DoEssayPage;
