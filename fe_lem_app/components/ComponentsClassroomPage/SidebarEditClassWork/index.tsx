"use client";

import Link from "next/link";
import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

export const SidebarEditClassWork = ({ ParentCallBack }) => {
  var classroomId = "";
  if (typeof window !== "undefined") {
    classroomId = localStorage.getItem("classroomId") ?? "";
  }
  const [name, setName] = useState<any>();
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date("11-03-2024"),
  });
  const handleValueChange = (newValue) => {
    setValue(newValue);
  };

  const handlerProp = () => {
    ParentCallBack({
      name: name,
      startAt: value.startDate,
      endAt: value.endDate,
    });
  };

  return (
    <>
      <div className="pr-2">
        <div className="flex gap-x-3">
          <p className="mt-0.5">Title: </p>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="text-body-color dark:text-body-color-dark dark:shadow-two flex w-full grow rounded-sm border border-stroke px-2 py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
          />
        </div>
        <div className="mt-5 flex">
          <p className="mt-1.5">Deadline: </p>
          <Datepicker
            value={value}
            onChange={handleValueChange}
            containerClassName="relative"
          />
        </div>
        <div className="mt-5 flex">
          <p>Allow submit late: </p>
          <input
            id="checked-checkbox"
            type="checkbox"
            value=""
            className="ml-2 mt-1.5 h-4 w-4"
          />
        </div>
        <div className="mt-5 flex">
          <p>Allow modified after submission: </p>
          <input
            id="checked-checkbox"
            type="checkbox"
            value=""
            className="ml-2 mt-1.5 h-4 w-4"
          />
        </div>
        <div className="mt-5 flex">
          <p>Limit submission times: </p>
          <input
            type="number"
            className="text-body-color dark:text-body-color-dark dark:shadow-two ml-2 flex w-20 rounded-sm border border-stroke px-2 py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
          />
        </div>
        <div className="mt-5 flex">
          <p>Due notifications: </p>
          <input
            id="checked-checkbox"
            type="checkbox"
            value=""
            className="ml-2 mt-1.5 h-4 w-4"
          />
        </div>
        <div className="mt-5 flex">
          <p>Notifications of students submitting: </p>
          <input
            id="checked-checkbox"
            type="checkbox"
            value=""
            className="ml-2 mt-1.5 h-4 w-4"
          />
        </div>
        <div className="mt-5 flex justify-end">
          <button
            onClick={handlerProp}
            className="my-1 flex w-30 justify-center rounded-sm border border-stroke py-1 text-base transition-all duration-300 hover:border-lime-800 hover:bg-lime-800/5 hover:text-lime-800 dark:border-transparent dark:bg-lime-800 dark:hover:border-lime-800 dark:hover:bg-lime-800/5 dark:hover:text-lime-800 dark:hover:shadow-none"
          >
            Create
          </button>
          <Link href={`/lem/classroom/${classroomId}/class-work`}>
            <button className="my-1 ml-5 flex w-30 justify-center rounded-sm border border-stroke py-1 text-base transition-all duration-300 hover:border-lime-800 hover:bg-lime-800/5 hover:text-lime-800 dark:border-transparent dark:bg-lime-800 dark:hover:border-lime-800 dark:hover:bg-lime-800/5 dark:hover:text-lime-800 dark:hover:shadow-none">
              Return
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};
