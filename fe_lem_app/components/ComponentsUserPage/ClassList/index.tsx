"use client";
import { redirect } from "next/navigation";
import { School } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { ListBoard } from "@/services/board-service";
import { ListBox } from "@/components/ListBox";
import { Classroom } from "@/models/classroom";
import { useEffect, useState } from "react";
import { ListOwn } from "@/services/class-service";

export const ClassList = () => {
  var currentUserId = "";
  if (typeof window !== "undefined") {
    currentUserId = localStorage.getItem("userId") ?? "";
  }
  const [classRoomData, setclassRoomData] = useState<Classroom[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      if (currentUserId !== "") {
        try {
          const data = await ListOwn(currentUserId);
          setclassRoomData(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [currentUserId]);
  return (
    <>
      <div className="flex items-center text-lg font-semibold text-neutral-700">
        <School className="mr-3" /> My classes
      </div>
      <ListBox
        isRecently={false}
        dataBoards={null}
        dataClasses={classRoomData}
      />
    </>
  );
};

ClassList.Skeleton = function SkeletonBoardList() {
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
