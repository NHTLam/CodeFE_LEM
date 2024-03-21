import { Skeleton } from "@/components/ui/skeleton";
import { FetchData } from "@/services/board-service";
import { ListBox } from "@/components/ListBox";
import { Clock9 } from "lucide-react";

export const ClassListRecents = async () => {
  // const classRecents = await FetchData();
  const classRecents = null;
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
