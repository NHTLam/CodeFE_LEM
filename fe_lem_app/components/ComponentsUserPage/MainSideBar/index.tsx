"use client";
import { useLocalStorage } from "usehooks-ts";
import { Accordion } from "@/components/ui/accordion";
import { NavItem } from "./sideItem";
import Link from "next/link";
import {
  Plus,
  CalendarDays,
  ClipboardList,
  DoorOpen,
  Presentation,
  Home,
  CheckCircle,
} from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { JoinClass, ListOwn } from "@/services/class-service";
import { Classroom } from "@/models/classroom";
import { GetOwnBoard } from "@/services/board-service";
import { Board } from "@/models/board";
import { Dialog, Transition } from "@headlessui/react";

interface SidebarProps {
  storageKey?: string;
}

export const Sidebar = ({ storageKey = "t-sidebar-state" }: SidebarProps) => {
  var currentUserId = "";
  if (typeof window !== "undefined") {
    currentUserId = localStorage.getItem("userId") ?? "";
  }
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {},
  );
  const [listClass, setlistClass] = useState<Classroom[] | null>(null);
  const [boardOwn, setboardOwn] = useState<Board | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [classroomCode, setClassroomCode] = useState("");

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }

      return acc;
    },
    [],
  );

  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      if (currentUserId !== "") {
        const classesOwn = await ListOwn(currentUserId);
        const boardOwn = await GetOwnBoard(Number(currentUserId));
        if (classesOwn !== null) {
          setlistClass(classesOwn);
        }
        if (boardOwn !== null) {
          setboardOwn(boardOwn);
        }
      }
    };
    fetchData();
  }, []);

  const handleMeetingClick = () => {
    window.open("http://meet.google.com/new", "_blank", "noopener,noreferrer");
  };

  async function handleJoinClass() {
    const isSuccess = await JoinClass(classroomCode);
    window.location.reload();
  }

  return (
    <>
      <div className="border-r pr-2">
        <div>
          <Link href={`/lem/home/user/${currentUserId}/user-home-page`}>
            <button className="text-body-color dark:text-body-color-dark dark:shadow-two flex w-full rounded-sm border border-stroke px-6 py-1 pl-15 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none">
              <span className="mr-3">
                <Home />
              </span>
              Home
            </button>
          </Link>
          <Link
            href={
              boardOwn === null ? `/error` : `/lem/home/board/${boardOwn?.id}`
            }
          >
            <button className="text-body-color dark:text-body-color-dark dark:shadow-two mt-5 flex w-full rounded-sm border border-stroke px-6 py-1 pl-15 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none">
              <span className="mr-3">
                <ClipboardList />
              </span>
              My board
            </button>
          </Link>
          <Link href={`/lem/home/user/${currentUserId}/calendar`}>
            <button className="text-body-color dark:text-body-color-dark dark:shadow-two mt-5 flex w-full rounded-sm border border-stroke px-6 py-1 pl-15 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none">
              <span className="mr-3">
                <CalendarDays />
              </span>
              Calendar
            </button>
          </Link>
          <button
            onClick={handleMeetingClick}
            className="text-body-color dark:text-body-color-dark dark:shadow-two mt-5 flex w-full rounded-sm border border-stroke px-6 py-1 pl-15 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
          >
            <span className="mr-3">
              <Presentation />
            </span>
            Meeting
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="text-body-color dark:text-body-color-dark dark:shadow-two mt-5 flex w-full rounded-sm border border-stroke px-6 py-1 pl-15 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
          >
            <span className="mr-3">
              <DoorOpen />
            </span>
            Join Class
          </button>
        </div>
        <hr className="mb-5 mt-5" />
        <Accordion
          type="multiple"
          defaultValue={defaultAccordionValue}
          className="space-y-2"
        >
          {listClass === null ? (
            <></>
          ) : (
            listClass!.map((classData) => (
              <NavItem
                key={classData.id}
                isExpanded={expanded[classData.id]}
                classroom={classData as Classroom}
                onExpand={onExpand}
              />
            ))
          )}
        </Accordion>
      </div>

      <Transition.Root show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setShowModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <CheckCircle
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Join Class
                      </Dialog.Title>
                      <form action="submit">
                        <div className="mt-2">
                          <input
                            type="text"
                            name="title"
                            className="block w-full rounded-md border-0 py-1.5 pl-3 
                                text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                                placeholder:text-gray-400 
                                focus:ring-2 focus:ring-inset 
                                focus:ring-violet-600 sm:text-sm sm:leading-6"
                            value={classroomCode}
                            onChange={(e) => setClassroomCode(e.target.value)}
                            placeholder="Title"
                          />
                        </div>
                        <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                          <button
                            type="button"
                            onClick={handleJoinClass}
                            className="inline-flex w-full justify-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 disabled:opacity-25 sm:col-start-2"
                            disabled={classroomCode === ""}
                          >
                            Join
                          </button>
                          <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                            onClick={() => setShowModal(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
