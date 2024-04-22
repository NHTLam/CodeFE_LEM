"use client";

import React, { Fragment, useEffect, useState } from "react";
import { redirect } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import { CheckIcon, ChevronDown } from "lucide-react";
import { Listbox, Transition } from "@headlessui/react";
import Link from "next/link";
import { FilterData } from "@/models/filter";
import { ListClassEvent } from "@/services/class-event-service";

export const ListClassWork = () => {
  var classroomId = "";
  var appUserId = "";
  if (typeof window !== "undefined") {
    classroomId = localStorage.getItem("classroomId") ?? "";
    appUserId = localStorage.getItem("userId") ?? "";
  }
  const filter: FilterData = {
    skip: 0,
    isClassWork: true,
    appUserId: Number(appUserId),
    classroomId: Number(classroomId),
  };

  const [classEvents, setClassEvents] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await ListClassEvent(filter);
      setClassEvents(data);
    };
    fetchData();
  }, []);

  const classWorkTypes = [
    {
      name: "Essay",
      link: `/lem/classroom/${classroomId}/class-work/edit-class-work/essay/make`,
    },
    {
      name: "Multiple choice",
      link: `/lem/classroom/${classroomId}/class-work/edit-class-work/multiple-choice/make`,
    },
  ];
  const [post, setPost] = useState<any>(false);
  const [showComment, setShowComment] = useState<any>(false);
  const [selected, setSelected] = useState(classWorkTypes[0]);

  const ConvertDateTime = (datetime) => {
    const convert = new Date(datetime);
    const format = `${convert.getHours()}:${convert.getMinutes()}, ${convert.getDate()}/${
      convert.getMonth() + 1
    }/${convert.getFullYear()}`;
    return format;
  };

  return (
    <div>
      <div className="mx-50 mt-10 flex justify-end">
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative z-10 pl-15">
            <Listbox.Button className="relative my-1 flex w-full cursor-default justify-center rounded-lg border border-stroke bg-white py-2 pl-3 pr-10 text-left text-sm outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none">
              <span className="block truncate">{selected.name}</span>
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
                {classWorkTypes.map((person, personIdx) => (
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
                        <Link href={`${person.link}`}>
                          <span
                            className={`block truncate pl-5 ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {person.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </Link>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>

      <div className="col-span-2 m-4 flex flex-col items-center space-y-4">
        {classEvents?.map((classEvent, index) => (
          <div
            key={index}
            className="w-3/4 rounded-lg border border-slate-500 p-6"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="w-full items-center justify-items-start sm:grid sm:grid-flow-row-dense sm:grid-cols-4">
                <div className="flex items-center gap-3">
                  <img
                    className="rounded-full border"
                    width={50}
                    alt="Avatar"
                    src="https://steamuserimages-a.akamaihd.net/ugc/784122845539964192/CD556A633510634D654B7C3CBB6A50DFFDC3258F/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
                  />
                  <div className="flex flex-col">
                    <p className="text-base">{classEvent.appUser.userName}</p>
                    <p className="text-xs">
                      {ConvertDateTime(classEvent.createdAt)}
                    </p>
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-semibold">{classEvent.name}</h1>
                </div>
              </div>
              <Link
                href={`/lem/classroom/${classroomId}/class-work/edit-class-work/essay/do/${classEvent.id}`}
              >
                <button className="my-1 flex w-30 justify-center rounded-sm border border-stroke py-1 text-base transition-all duration-300 hover:border-blue-800 hover:bg-blue-800/5 hover:text-lime-800 dark:border-transparent dark:bg-blue-800 dark:hover:border-blue-800 dark:hover:bg-blue-800/5 dark:hover:text-lime-800 dark:hover:shadow-none">
                  Do
                </button>
              </Link>
              {classEvent.isSubmit == false ? (
                <Link
                  href={`/lem/classroom/class-work/edit-class-work/essay/do/${classEvent.id}`}
                >
                  <button className="my-1 flex w-30 justify-center rounded-sm border border-stroke py-1 text-base transition-all duration-300 hover:border-blue-800 hover:bg-blue-800/5 hover:text-lime-800 dark:border-transparent dark:bg-blue-800 dark:hover:border-blue-800 dark:hover:bg-blue-800/5 dark:hover:text-lime-800 dark:hover:shadow-none">
                    Làm bài
                  </button>
                </Link>
              ) : (
                <Link
                  href={`/lem/classroom/1/class-work/edit-class-work/essay/detail/${classEvent.id}`}
                >
                  <button className="my-1 flex w-30 justify-center rounded-sm border border-stroke py-1 text-base transition-all duration-300 hover:border-blue-800 hover:bg-blue-800/5 hover:text-lime-800 dark:border-transparent dark:bg-blue-800 dark:hover:border-blue-800 dark:hover:bg-blue-800/5 dark:hover:text-lime-800 dark:hover:shadow-none">
                    Xem bài làm
                  </button>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

ListClassWork.Skeleton = function SkeletonClassEventList() {
  return (
    <div className="gird-cols-2 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
    </div>
  );
};
