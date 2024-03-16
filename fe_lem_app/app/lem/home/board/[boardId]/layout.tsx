import { notFound, redirect } from "next/navigation";

import Navbar from "@/components/ComponentsUserPage/Navbar";
import { GetData } from "@/services/board-service";

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

    const board = await GetData(Number(params.boardId));

    return {
        title: board?.name || "Board",
    };
}

const BoardIdLayout = async ({ children, params,}: { children: React.ReactNode; params: { boardId: string; };}) => {
    const { userId } = useFakeAuth();

    if (!userId) {
        redirect("/select-org");
    }

    const board = await GetData(Number(params.boardId));

    if (!board) {
        notFound();
    }

    return (
        <div
            className="relative h-full bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url(${board.imageUrl})` }}
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