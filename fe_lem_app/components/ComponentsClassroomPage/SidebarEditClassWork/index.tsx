"use client";

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDown } from "lucide-react";
import { Fragment, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { redirect } from "next/navigation";

export const SidebarEditClassWork = ({ ParentCallBack }) => {
  var classroomId = "";
  if (typeof window !== "undefined") {
    classroomId = localStorage.getItem("classroomId") ?? "";
  }
  const member = [
    { name: "Member A" },
    { name: "Member B" },
    { name: "Member C" },
  ];
  const [selected, setSelected] = useState(member[0]);
  const [canRedirect, setCanRedirect] = useState(false);
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
    setCanRedirect(true);
  };

  if (canRedirect) {
    redirect(`/lem/classroom/${classroomId}/class-work`);
  }

  return (
    <div className="pr-2">
      <div className="flex gap-x-3">
        <p className="mt-0.5">Title: </p>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="text-body-color dark:text-body-color-dark dark:shadow-two flex w-full grow rounded-sm border border-stroke px-2 py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
        />
      </div>
      <div className="mt-5 flex gap-x-3">
        <p className="mt-1.5">Intended for: </p>
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative z-10">
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
                {member.map((person, personIdx) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pr-4 ${
                        active ? "bg-amber-100 text-amber-900" : ""
                      }`
                    }
                    value={person}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate pl-5 ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {person.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
      <div className="mt-5 flex">
        <p>Point: </p>
        <input
          type="text"
          className="text-body-color dark:text-body-color-dark dark:shadow-two ml-3 flex w-full grow rounded-sm border border-stroke px-2 py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
        />
      </div>
      <div className="mt-5 flex">
        <p className="mt-1.5">Submission deadline: </p>
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
      </div>
    </div>
  );
};
