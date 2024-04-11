import { notFound, redirect } from "next/navigation";

import Navbar from "@/components/ComponentsUserPage/Navbar";
import { GetBoard } from "@/services/board-service";

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

export async function generateMetadata({
  params,
}: {
  params: { boardId: string };
}) {
  const { userId } = useFakeAuth();

  if (!userId) {
    return {
      title: "Board",
    };
  }

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
  const { userId } = useFakeAuth();

  if (!userId) {
    redirect("/select-org");
  }

  const board = await GetBoard(Number(params.boardId));

  if (!board) {
    notFound();
  }

  return (
    <div
      className="h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${board.imageUrl})` }}
    >
      <Navbar />
      {children}
    </div>
  );
};

export default BoardIdLayout;
