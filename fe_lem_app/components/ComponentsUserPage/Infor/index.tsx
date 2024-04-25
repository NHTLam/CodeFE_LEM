"use client";

import { Search, Trash, Pin, Filter } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const Info = ({ parentCallback }) => {
  const handleSearch = (searchKey: string) => {
    parentCallback(searchKey);
  };

  if (typeof window !== "undefined") {
    localStorage.setItem("classroomId", ""); // cứ về trang đầu đồng nghĩa là thoát classroom thì set lại classroomId là rỗng
  }

  return (
    <div className="flex items-center gap-x-4 pb-4 pl-3">
      <div className="flex gap-2">
        <button className="my-1 flex w-30 justify-center rounded-sm border border-stroke py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none">
          <Filter className="pr-1" /> Filter
        </button>
        <button className="my-1 flex w-30 justify-center rounded-sm border border-stroke py-1 text-base outline-none transition-all duration-300 hover:border-lime-800 hover:bg-lime-800/5 hover:text-lime-800 dark:border-transparent dark:bg-lime-800 dark:hover:border-lime-800 dark:hover:bg-lime-800/5 dark:hover:text-lime-800 dark:hover:shadow-none">
          <Pin className="pr-1" /> Pin
        </button>
        <button className="my-1 flex w-30 justify-center rounded-sm border border-stroke py-1 text-base outline-none transition-all duration-300 hover:border-rose-600 hover:bg-red-200/5 hover:text-red-600 dark:border-transparent dark:bg-red-200 dark:hover:border-rose-600 dark:hover:bg-red-200/5 dark:hover:text-red-600 dark:hover:shadow-none">
          <Trash className="pr-1" /> Trash
        </button>
      </div>

      <div className="absolute right-10 flex">
        <Search className="mr-1 mt-1" />
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => handleSearch(e.target.value)}
          className="text-body-color dark:text-body-color-dark dark:shadow-two flex w-full grow rounded-sm border border-stroke px-2 py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
        />
      </div>
    </div>
  );
};
