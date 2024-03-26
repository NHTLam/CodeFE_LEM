"use client";
import { useLocalStorage } from "usehooks-ts";
import { Button, Input } from "@nextui-org/react";
import { Accordion } from "@/components/ui/accordion";
import { NavItem, Organization } from "./sideItem";
import Link from "next/link";
import {
  Plus,
  CalendarDays,
  ClipboardList,
  Settings,
  Presentation,
  Search,
  Home,
} from "lucide-react";

interface SidebarProps {
  storageKey?: string;
}

export const Sidebar = ({ storageKey = "t-sidebar-state" }: SidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {},
  );

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

  const fakeActiveOrganization = {
    id: "1",
    slug: "a",
    imageUrl: "",
    name: "a",
  };

  const fakeUserMemberships = [
    {
      id: "1",
      slug: "",
      imageUrl: "",
      name: "Lớp 5A",
    },
    {
      id: "2",
      slug: "",
      imageUrl: "",
      name: "Không gian làm việc của tôi",
    },
    {
      id: "3",
      slug: "",
      imageUrl: "",
      name: "Bảng công việc nhóm",
    },
  ];

  const mappedData = fakeUserMemberships.map((membership) => ({
    organization: membership,
  }));

  const isLoadedOrg = true;
  const isLoadedOrgList = true;

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
        <Link href="/lem/home/user/user-home-page">
          <button className="text-body-color dark:text-body-color-dark dark:shadow-two flex w-full rounded-sm border border-stroke px-6 py-1 pl-15 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none">
            <span className="mr-3">
              <Home />
            </span>
            Home
          </button>
        </Link>
        <Link href="/lem/home/board/7">
          <button className="text-body-color dark:text-body-color-dark dark:shadow-two mt-5 flex w-full rounded-sm border border-stroke px-6 py-1 pl-15 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none">
            <span className="mr-3">
              <ClipboardList />
            </span>
            My board
          </button>
        </Link>
        <Link href="/lem/home/user/calendar">
          <button className="text-body-color dark:text-body-color-dark dark:shadow-two mt-5 flex w-full rounded-sm border border-stroke px-6 py-1 pl-15 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none">
            <span className="mr-3">
              <CalendarDays />
            </span>
            Calendar
          </button>
        </Link>
        <button className="text-body-color dark:text-body-color-dark dark:shadow-two mt-5 flex w-full rounded-sm border border-stroke px-6 py-1 pl-15 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none">
          <span className="mr-3">
            <Presentation />
          </span>
          Meeting
        </button>
        <button className="text-body-color dark:text-body-color-dark dark:shadow-two mt-5 flex w-full rounded-sm border border-stroke px-6 py-1 pl-15 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none">
          <span className="mr-3">
            <Settings />
          </span>
          Settings
        </button>
      </div>
      <hr className="mb-1 mt-5" />
      <div className="mb-2 flex">
        <input
          type="text"
          placeholder="Search"
          className="mb-2 ml-1 w-full grow border-b-2 border-solid !bg-white focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:!bg-black dark:focus:border-manatee dark:focus:placeholder:text-white"
        />
        <button className="my-1 ml-2 flex w-10 justify-center rounded-sm border border-stroke px-3 py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none">
          <Link href="">
            <Plus className="w-4" />
          </Link>
        </button>
      </div>
      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-2"
      >
        {mappedData.map(({ organization }) => (
          <NavItem
            key={organization.id}
            isActive={fakeActiveOrganization?.id === organization.id}
            isExpanded={expanded[organization.id]}
            organization={organization as Organization}
            onExpand={onExpand}
          />
        ))}
      </Accordion>
    </div>
  );
};
