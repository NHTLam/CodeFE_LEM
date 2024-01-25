import { notFound, redirect } from "next/navigation";

import Navbar from "@/components/ComponentsUserPage/Navbar";

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

export async function generateMetadata({ params }: {params: { boardId: string; };}) {
    const { userId } = useFakeAuth();

    if (!userId) {
        return {
        title: "Board",
        };
    }

    //   const board = await db.board.findUnique({
    //     where: {
    //       id: params.boardId,
    //       userId
    //     }
    //   });

    const board = {
        id: "1",
        title: "Board 1",
        createdAt: new Date(),
        updatedAt: new Date(),
        imageThumbUrl: "https://images.unsplash.com/photo-1683009427692-8a28348b0965?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    };

    return {
    title: board?.title || "Board",
    };
}

const BoardIdLayout = async ({ children, params,}: { children: React.ReactNode; params: { boardId: string; };}) => {
    const { userId } = useFakeAuth();

    if (!userId) {
        redirect("/select-org");
    }

    //   const board = await db.board.findUnique({
    //     where: {
    //       id: params.boardId,
    //       userId,
    //     },
    //   });

    const board = {
        id: "1",
        title: "Board 1",
        createdAt: new Date(),
        updatedAt: new Date(),
        imageThumbUrl: "https://images.unsplash.com/photo-1683009427692-8a28348b0965?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    };

    if (!board) {
        notFound();
    }

    return (
        <div
            className="relative h-full bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
        >
        <Navbar />
        <div className="absolute inset-0 bg-black/10" />
        <main className="relative pt-28 h-full">
            {children}
        </main>
        </div>
    );
};

export default BoardIdLayout;