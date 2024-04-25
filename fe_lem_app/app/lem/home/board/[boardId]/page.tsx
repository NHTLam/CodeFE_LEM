import { BoardComponent } from "@/components/ComponentsBoard/Board";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

const BoardIdPage = ({ params }: BoardIdPageProps) => {
  return <BoardComponent boardId={params.boardId} />;
};

export default BoardIdPage;
