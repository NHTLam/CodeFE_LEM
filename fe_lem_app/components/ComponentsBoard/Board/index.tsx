"use client";

import { redirect } from "next/navigation";
import { ListCard } from "@/components/ComponentsBoard/ListCard";
import { defaultImages } from "@/public/defaultImages/images";
import { GetBoard } from "@/services/board-service";
import { useEffect, useState } from "react";
import { Board } from "@/models/board";

export const BoardComponent = ({ boardId }) => {
  const [board, setBoard] = useState<Board>();

  useEffect(() => {
    const fetchData = async () => {
      const BoardData = await GetBoard(Number(boardId));
      setBoard(BoardData ?? {});
    };
    fetchData();
  }, []);

  return (
    <>
      {board?.imageUrl === null || board?.imageUrl === "" ? (
        <div
          className="h-screen bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${defaultImages[5].urls.full})` }}
        >
          <div className="h-full overflow-x-auto p-4 pt-30">
            <ListCard boardId={boardId} />
          </div>
        </div>
      ) : (
        <div
          className="h-screen bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${board?.imageUrl})` }}
        >
          <div className="h-full overflow-x-auto p-4 pt-30">
            <ListCard boardId={boardId} />
          </div>
        </div>
      )}
    </>
  );
};
