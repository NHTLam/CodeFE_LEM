"use client";
import { useEffect, useState } from "react";
import { Circle, ClipboardPen, Upload } from "lucide-react";
import Link from "next/link";
import { FeedBackTable } from "@/components/ComponentsClassroomPage/FeedbackTable";
import { FileTable } from "@/components/ComponentsClassroomPage/FileTable";
import { GetClassEvent } from "@/services/class-event-service";
import { FilterData } from "@/models/filter";
import { UpdateQuestion } from "@/services/question-service";
import {
  CreateStudentAnswer,
  DetailStudentAnswer,
} from "@/services/student-answer-service";
import { TableDetail } from "@/components/ComponentsClassroomPage/TableDetail";

interface WorkIdPageProps {
  params: {
    detailId: string;
  };
}

const detailActivityPage = ({ params }: WorkIdPageProps) => {
  const [classWork, setClassWork] = useState<any>();
  const [answer, setAnswer] = useState<any>([]);
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
    id: parseInt(params.detailId),
    code: "",
    name: "",
  };

  const ConvertDateTime = (datetime) => {
    const convert = new Date(datetime);
    const format = `${convert.getHours()}:${convert.getMinutes()}, ${convert.getDate()}/${
      convert.getMonth() + 1
    }/${convert.getFullYear()}`;
    return format;
  };

  useEffect(() => {
    if (first == true) {
      const fetchData = async () => {
        const data = await GetClassEvent(filter);
        const dataAnswer = await DetailStudentAnswer({
          id: 0,
          appUserId: Number(appUserId) == 0 ? 1 : Number(appUserId),
          classEventId: parseInt(params.detailId),
        });
        setClassWork(data);
        setAnswer(dataAnswer);
      };
      fetchData();
      setFirst(false);
    }
  }, []);

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
          <Link href={`/lem/classroom/${classroomId}/class-work`}>
            <button className="dark:hover:shadetailw-none my-1 mr-10 flex w-30 justify-center rounded-sm border border-stroke py-1 text-base outline-none transition-all duration-300 hover:border-rose-600 hover:bg-red-200/5 hover:text-red-600 dark:border-transparent dark:bg-red-200 dark:hover:border-rose-600 dark:hover:bg-red-200/5 dark:hover:text-red-600">
              Return
            </button>
          </Link>
        {/* </div>
        <div className="flex items-center justify-between text-2xl font-semibold text-blue-500"> */}
          {/* <div className="flex">
            <ClipboardPen className="mr-2 h-10 w-10" />
            <p>{classWork?.questions[current].name}</p>
          </div> */}
          {/* <div className="flex">
            <button
              onClick={() => SwapPage(0)}
              className="dark:hover:shadetailw-none my-1 flex w-30 justify-center rounded-sm border border-stroke py-1 text-base outline-none transition-all duration-300 hover:border-lime-800 hover:bg-lime-800/5 hover:text-lime-800 dark:border-transparent dark:bg-lime-800 dark:hover:border-lime-800 dark:hover:bg-lime-800/5 dark:hover:text-lime-800"
            >
              Previous
            </button>
            <button
              onClick={() => SwapPage(1)}
              className="dark:hover:shadetailw-none my-1 ml-20 flex w-30 justify-center rounded-sm border border-stroke py-1 text-base outline-none transition-all duration-300 hover:border-lime-800 hover:bg-lime-800/5 hover:text-lime-800 dark:border-transparent dark:bg-lime-800 dark:hover:border-lime-800 dark:hover:bg-lime-800/5 dark:hover:text-lime-800"
            >
              Next
            </button>
          </div> */}
        </div>
        {/* <p className="mx-2 mt-5 font-bold">Description:</p>
        <p className="mx-2">{classWork?.questions[current].description}</p> */}
      </div>
      {/* <hr className="mx-7 my-4" />
      <div className="mx-5">
        <p className="mx-2 mt-5 font-bold">Instruction:</p>
        <p className="mx-2">{classWork?.questions[current].instruction}</p>
      </div>
      <hr className="mx-7 my-4" />
      <div className="mx-5 mb-10">
        <p className="mx-2 mt-5 font-bold">Answer:</p>
        <p className="mx-2">{answer[current]?.name}</p>
      </div> */}
      <div className="mx-8 mt-10 mb-30">
        <TableDetail />
      </div>
      <div className="mx-8 mb-5">
        <FileTable />
      </div>
      <div className="mb-20">
        <p className="ml-10">FeedBack</p>
        <div className="flex flex-col">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td className="w-24 whitespace-nowrap bg-gray-50 px-6 py-4">
                      Grade
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {answer[current]?.grade}
                    </td>
                  </tr>
                  <tr>
                    <td className="w-24 whitespace-nowrap bg-gray-50 px-6 py-4">
                      Feedback
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {answer[current]?.feedback}
                    </td>
                  </tr>
                  <tr>
                    <td className="w-24 whitespace-nowrap bg-gray-50 px-6 py-4">
                      Marker
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {answer[current]?.appUserFeedback.userName}
                    </td>
                  </tr>
                  <tr>
                    <td className="w-24 whitespace-nowrap bg-gray-50 px-6 py-4">
                      Grade At
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {ConvertDateTime(answer[current]?.gradeAt)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default detailActivityPage;
