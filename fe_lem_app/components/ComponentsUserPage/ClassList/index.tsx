import { redirect } from "next/navigation";
import { School } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { ListBoard } from "@/services/board-service";
import { ListBox } from "@/components/ListBox";
import { Classroom } from "@/models/classroom";

interface ClassListPros {
  data: Classroom[] | null;
}
export const ClassList = async ({ data }: ClassListPros) => {
  // const availableCount = await getAvailableCount();
  console.log("Classroom data: " + data);
  return (
    <>
      <div className="flex items-center text-lg font-semibold text-neutral-700">
        <School className="mr-3" /> My classes
      </div>
      <ListBox isRecently={false} dataBoards={null} dataClasses={data} />
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
