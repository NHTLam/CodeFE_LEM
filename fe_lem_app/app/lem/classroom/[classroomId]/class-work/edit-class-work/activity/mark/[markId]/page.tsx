"use client";
import { Fragment, useEffect, useState } from "react";
import { CheckIcon, ChevronDown, ClipboardPen } from "lucide-react";
import Link from "next/link";
import { FileTable } from "@/components/ComponentsClassroomPage/FileTable";
import { GetClassEvent } from "@/services/class-event-service";
import {
  CreateStudentAnswer,
  DetailStudentAnswer,
  ListStudentAnswer,
  UpdateStudentAnswer,
} from "@/services/student-answer-service";
import { Listbox, Transition } from "@headlessui/react";
import { toast } from "sonner";

interface WorkIdPageProps {
  params: {
    markId: string;
  };
}

const detailActivityPage = ({ params }: WorkIdPageProps) => {
  const [classWork, setClassWork] = useState<any>();
  const [appUser, setAppUser] = useState<any>([
    {
      id: 0,
      userName: "User",
    },
  ]);
  const [answer, setAnswer] = useState<any>([]);
  const [first, setFirst] = useState<any>(true);
  const [current, setCurrent] = useState<number>(0);
  const [userId, setUserId] = useState<number>(1);
  const [grade, setGrade] = useState<object>({});
  const [feedback, setFeedback] = useState<object>({});

  var classroomId = "";
  var appUserId = "";
  if (typeof window !== "undefined") {
    classroomId = localStorage.getItem("classroomId") ?? "";
    appUserId = localStorage.getItem("userId") ?? "";
  }

  const filter: any = {
    id: parseInt(params.markId),
    code: "",
    name: "",
  };

  useEffect(() => {
    if (first == true) {
      const fetchData = async () => {
        const data = await GetClassEvent(filter);
        const dataUser = await ListStudentAnswer({
          classEventId: parseInt(params.markId),
        });
        const dataAnswer = await DetailStudentAnswer({
          id: 0,
          appUserId: userId,
          classEventId: parseInt(params.markId),
        });
        setClassWork(data);
        setAppUser(dataUser);
        setAnswer(dataAnswer);
        console.log(dataUser);
        console.log(dataAnswer);
      };
      fetchData();
      setFirst(false);
    }
  }, []);
  const [selected, setSelected] = useState(appUser[0]);

  const AnswerPerUser = (id) => {
    const fetchData = async () => {
      const dataAnswer = await DetailStudentAnswer({
        id: 0,
        appUserId: id,
        classEventId: parseInt(params.markId),
      });

      setAnswer(dataAnswer);
      setUserId(id);
    };
    fetchData();
  };

  const submitAnswer = async () => {
    for (let index = 0; index < answer.length; index++) {
      await UpdateStudentAnswer({
        appUserId: userId,
        questionId: classWork?.questions[index].id,
        name: answer[index]?.name,
        id: answer[index]?.id,
        grade: grade[index],
        feedback: feedback[index],
        appUserFeedbackId: appUserId,
      });
    }
    setTimeout(() => {
      window.location.href = `/lem/classroom/${classroomId}/class-work`;
    }, 1000);
    toast.success("Create question success", {
      style: {
        color: "green",
      },
    });
  };

  return (
    <>
      <div className="mx-5">
        <div className="flex justify-between">
          <div className="mb-8 flex h-10">
            <p className="mt-2 font-bold">Choose student:</p>
            <div className="mr-10 flex justify-end">
              <Listbox value={selected} onChange={setSelected}>
                <div className="relative z-10 pl-5">
                  <Listbox.Button className="relative my-1 flex w-full cursor-default justify-center border border-stroke bg-white py-1.5 pl-3 pr-10 text-left text-sm outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none">
                    <span className="block truncate">{selected.userName}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                      {appUser.map((person, personIdx) => (
                        <Listbox.Option
                          key={personIdx}
                          className={({ active }) =>
                            `relative w-full cursor-default select-none py-2 pr-4 ${
                              active ? "bg-amber-100 text-amber-900" : ""
                            }`
                          }
                          value={person}
                        >
                          {({ selected }) => (
                            <>
                              <div onClick={() => AnswerPerUser(person.id)}>
                                <span
                                  className={`block truncate pl-5 ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {person.userName}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </div>
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
            <div className="flex">
              <Link href={`/lem/classroom/${classroomId}/class-work`}>
                <button className="my-1 mr-10 flex w-30 justify-center rounded-sm border border-stroke py-1 text-base outline-none transition-all duration-300 hover:border-rose-600 hover:bg-red-200/5 hover:text-red-600">
                  Return
                </button>
              </Link>
              <button
                onClick={submitAnswer}
                className="my-1 mr-10 flex w-30 justify-center rounded-sm border border-stroke py-1 text-base outline-none transition-all duration-300 hover:border-blue-600 hover:bg-blue-200/5 hover:text-blue-600"
              >
                Mark
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div className="mt-5 flex items-center justify-between text-2xl font-semibold text-blue-500">
          <div className="flex">
            <ClipboardPen className="mr-2 h-10 w-10" />
            <p>Activity</p>
          </div>
        </div>
        <p className="mx-2 mt-5 font-bold">Description:</p>
        <p className="mx-2">{classWork?.questions[current].description}</p>
      </div>
      <hr className="mx-7 my-4" />
      <div className="mx-5 mb-10">
        <p className="mx-2 mt-5 font-bold">Answer:</p>
        <p className="mx-2">{answer[current]?.name}</p>
      </div>
      <div className="mx-8 mb-5">
        <FileTable
          ParentCallBack={null}
          data={classWork?.questions[current].attachments}
        />
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
                    <td className="whitespace-nowrap">
                      <textarea
                        rows={2}
                        value={grade[current] || ""}
                        onChange={(e) => {
                          setGrade((prev) => {
                            const updated = { ...prev };
                            updated[current] = e.target.value;
                            console.log(updated);
                            return updated;
                          });
                        }}
                        className="flex w-full grow rounded-sm border border-stroke px-2 py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5"
                      ></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td className="w-24 whitespace-nowrap bg-gray-50 px-6 py-4">
                      Feed back
                    </td>
                    <td className="whitespace-nowrap">
                      <textarea
                        rows={5}
                        value={feedback[current] || ""}
                        onChange={(e) => {
                          setFeedback((prev) => {
                            const updated = { ...prev };
                            updated[current] = e.target.value;
                            console.log(updated);
                            return updated;
                          });
                        }}
                        className="flex w-full grow rounded-sm border border-stroke px-2 py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5"
                      ></textarea>
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
