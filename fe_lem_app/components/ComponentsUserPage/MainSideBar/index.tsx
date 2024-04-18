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
} from "lucide-react";
import { useEffect, useState } from "react";
import { ListOwn } from "@/services/class-service";
import { Classroom } from "@/models/classroom";
import { GetOwnBoard } from "@/services/board-service";
import { Board } from "@/models/board";

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

  // const mappedData = fakeUserMemberships.map((membership) => ({
  //   organization: membership,
  // }));

  // if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
  //   return (
  //     <>
  //       <div className="flex items-center justify-between mb-2">
  //         <Skeleton className="h-10 w-[50%]" />
  //         <Skeleton className="h-10 w-10" />
  //       </div>
  //       <div className="space-y-2">
  //         <NavItem.Skeleton />
  //         <NavItem.Skeleton />
  //         <NavItem.Skeleton />
  //       </div>
  //     </>
  //   );
  // }

  return (
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
        <button className="text-body-color dark:text-body-color-dark dark:shadow-two mt-5 flex w-full rounded-sm border border-stroke px-6 py-1 pl-15 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none">
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
  );
};
