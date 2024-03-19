"use client";
import { useLocalStorage } from "usehooks-ts";
import { Button, Input } from "@nextui-org/react";
import { Accordion } from "@/components/ui/accordion";
import { NavItem, Organization } from "./sideItem";
import Link from "next/link";
import { Plus, CalendarDays, ClipboardList, Settings, Presentation, Search, Home } from "lucide-react";

interface SidebarProps {
  storageKey?: string;
};

export const Sidebar = ({
  storageKey = "t-sidebar-state",
}: SidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );
  
  const defaultAccordionValue: string[] = Object.keys(expanded)
    .reduce((acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }

      return acc;
  }, []);

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
      <div className="font-medium text-xs flex items-center mb-1" suppressHydrationWarning>
        <span className="pl-4">
          My classes
        </span>
        <Button isIconOnly color="danger" aria-label="Like" className="ml-auto pt-2 pb-2 pl-4 pr-4">
          <Link href="">
              <Plus
                className="w-4"
              />
            </Link>
        </Button>  
      </div>
      <div>
        <Link href="/lem/home/user/user_home_page">       
          <button
            className="pl-15 text-body-color dark:text-body-color-dark dark:shadow-two flex w-full rounded-sm border border-stroke px-6 py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
          >
            <span className="mr-3">
              <Home/>
            </span>
            Home
          </button>
        </Link>
        <button
          className="pl-15 mt-5 text-body-color dark:text-body-color-dark dark:shadow-two flex w-full rounded-sm border border-stroke px-6 py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
        >
          <span className="mr-3">
            <ClipboardList/>
          </span>
          My board
        </button>
        <Link href="/lem/home/user/calendar">       
          <button
            className="pl-15 mt-5 text-body-color dark:text-body-color-dark dark:shadow-two flex w-full rounded-sm border border-stroke px-6 py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
          >
            <span className="mr-3">
              <CalendarDays/>
            </span>
            Calendar
          </button>
        </Link>
        <button
          className="pl-15 mt-5 text-body-color dark:text-body-color-dark dark:shadow-two flex w-full rounded-sm border border-stroke px-6 py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
        >
          <span className="mr-3">
            <Presentation/>
          </span>
          Meeting
        </button>
        <button
          className="pl-15 mt-5 text-body-color dark:text-body-color-dark dark:shadow-two flex w-full rounded-sm border border-stroke px-6 py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
        >
          <span className="mr-3">
            <Settings/>
          </span>
          Settings
        </button>
      </div>
      <hr className="mt-5 mb-5"/>
      <div className="flex">
        <Search/>
        <input
          type="text"
          placeholder="Search"
          className="ml-2 mb-5 w-full border-solid border-b-2 !bg-white focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:!bg-black dark:focus:border-manatee dark:focus:placeholder:text-white"
        />
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