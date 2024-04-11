"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { ListBox } from "@/components/ListBox";
import { Clock9 } from "lucide-react";
import { Classroom } from "@/models/classroom";
import { useEffect, useState } from "react";
import { ListOwn } from "@/services/class-service";

export const ClassListRecents = () => {
  var currentUserId = "";
  if (typeof window !== "undefined") {
    currentUserId = localStorage.getItem("userId") ?? "";
  }
  const [classRecents, setclassRecents] = useState<Classroom[] | null>(null);
  var assignData: Classroom[] | null = [];
  useEffect(() => {
    const fetchData = async () => {
      if (currentUserId !== "") {
        const data = await ListOwn(currentUserId);
        if (data !== null) {
          var currentClassRecents = data;
          assignData = data;
          currentClassRecents = currentClassRecents.sort((a, b) => {
            return (
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            );
          });
          currentClassRecents = currentClassRecents.slice(0, 5);
          setclassRecents(currentClassRecents);
        }
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="flex items-center text-lg font-semibold text-neutral-700">
        <Clock9 className="mr-3" /> Recently
      </div>
      <ListBox isRecently={true} dataBoards={null} dataClasses={classRecents} />
    </>
  );
};

ClassListRecents.Skeleton = function SkeletonBoardList() {
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
