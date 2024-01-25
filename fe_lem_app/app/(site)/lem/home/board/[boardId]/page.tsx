import { redirect } from "next/navigation";

import { ListContainer } from "@/components/ComponentsBoard/ListContainer";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
};

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

const BoardIdPage = async ({
  params,
}: BoardIdPageProps) => {
  const { userId } = useFakeAuth();

  if (!userId) {
    redirect("/select-org");
  }
  
//   const lists = await db.list.findMany({
//     where: {
//       boardId: params.boardId,
//       board: {
//         userId,
//       },
//     },
//     include: {
//       cards: {
//         orderBy: {
//           order: "asc",
//         },
//       },
//     },
//     orderBy: {
//       order: "asc",
//     },
//   });
const lists = [
    {
      id: "75b54a35-54a5-43f5-954d-4a554a3f54a5",
      title: "To-Do List",
      order: 1,
      boardId: "654a354a-54a3-54a5-4a53-454a354a554a", // Giả sử đây là ID của Board liên quan
      createdAt: new Date(),
      updatedAt: new Date(),
      cards: [
        {
          id: "54a354a3-54a3-4a53-4a53-4a53454a354a",
          title: "Buy groceries",
          order: 1,
          description: "Pick up milk, eggs, and bread.",
          listId: "75b54a35-54a5-43f5-954d-4a554a3f54a5",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "354a354a-354a-54a3-54a3-54a354a354a3",
          title: "Finish project proposal",
          order: 2,
          description: "Write up the proposal and send it to the client by Friday.",
          listId: "75b54a35-54a5-43f5-954d-4a554a3f54a5",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    },
    {
      id: "a354a354-a54a-54a3-54a3-54a354a354a3",
      title: "Ideas",
      order: 2,
      boardId: "654a354a-54a3-54a5-4a53-454a354a554a",
      createdAt: new Date(),
      updatedAt: new Date(),
      cards: [
        {
          id: "54a354a3-4a53-4a53-4a53-4354a354a354",
          title: "Write a blog post about productivity tips",
          order: 1,
          description: null,
          listId: "a354a354-a54a-54a3-54a3-54a354a354a3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    },
  ];

  return (
    <div className="p-4 h-full overflow-x-auto">
      <ListContainer
        boardId={params.boardId}
        data={lists}
      />
    </div>
  );
};

export default BoardIdPage;