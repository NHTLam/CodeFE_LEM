"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { ListBox } from "@/components/ListBox";
import { Clock9 } from "lucide-react";
import { Classroom } from "@/models/classroom";
import { useEffect, useState } from "react";
import { ListOwn } from "@/services/class-service";

interface ClassListRecentsPros {
  searchKey: string;
}

export const ClassListRecents = ({ searchKey }: ClassListRecentsPros) => {
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

          if (
            searchKey !== null &&
            searchKey !== "" &&
            searchKey !== undefined
          ) {
            const datas =
              currentClassRecents?.filter(
                (x) => x.name?.toLowerCase().includes(searchKey.toLowerCase()),
              ) ?? [];

            setclassRecents(datas);
          } else {
            setclassRecents(currentClassRecents);
          }
        }
      }
    };
    fetchData();
  }, [searchKey]);

  return (
    <>
      <div className="flex items-center text-lg font-semibold text-neutral-700">
        <Clock9 className="mr-3" /> Recently
      </div>
      <ListBox
        isRecently={true}
        dataBoards={null}
        dataClasses={classRecents}
        classroomIdForBoard={0}
      />
    </>
  );
};
