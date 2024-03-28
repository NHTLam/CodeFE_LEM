import { redirect } from "next/navigation";
import { School } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { FetchData } from "@/services/board-service";
import { ListBox } from "@/components/ListBox";

const useFakeAuth = () => {
  const user = {
    userId: "1234567890",
    username: "John Doe",
    email: "johndoe@example.com",
  };

  return {
    userId: user.userId,
    username: user.username,
    email: user.email,
    isAuthenticated: true,
    isLoading: false,
    error: null,
  };
};

export const ClassList = async () => {
  const { userId } = useFakeAuth();
  if (userId == "0") {
    return redirect("/select-org");
  }

  const boards = await FetchData();

  // const availableCount = await getAvailableCount();
  return (
    <>
      <div className="flex items-center text-lg font-semibold text-neutral-700">
        <School className="mr-3" /> My classes
      </div>
      <ListBox isRecently={false} dataBoards={boards} dataClasses={null} />
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
