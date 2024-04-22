import { notFound, redirect } from "next/navigation";

import Navbar from "@/components/ComponentsUserPage/Navbar";
import { defaultImages } from "@/public/defaultImages/images";
import { GetBoard } from "@/services/board-service";

export async function generateMetadata({
  params,
}: {
  params: { boardId: string };
}) {
  const board = await GetBoard(Number(params.boardId));

  return {
    title: board?.name || "Board",
  };
}

const BoardIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { boardId: string };
}) => {
  const board = await GetBoard(Number(params.boardId));
  if (!board) {
    notFound();
  }

  return (
    <>
      {board.imageUrl === null || board.imageUrl === "" ? (
        <div
          className="h-screen bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${defaultImages[5].urls.full})` }}
        >
          <Navbar />
          {children}
        </div>
      ) : (
        <div
          className="h-screen bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${board.imageUrl})` }}
        >
          <Navbar />
          {children}
        </div>
      )}
    </>
  );
};

export default BoardIdLayout;
