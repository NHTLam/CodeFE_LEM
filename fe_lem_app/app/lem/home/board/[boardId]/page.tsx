import { redirect } from "next/navigation";
import { ListCard } from "@/components/ComponentsBoard/ListCard";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

const BoardIdPage = async ({ params }: BoardIdPageProps) => {
  return (
    <div className="h-full overflow-x-auto p-4 pt-30">
      <ListCard boardId={params.boardId} />
    </div>
  );
};

export default BoardIdPage;
