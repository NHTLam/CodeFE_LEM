import { Board } from "@/models/board";
import { NextResponse } from "next/server";

const DATA_SOURCE_URL = process.env.BASE_URL + "/lem/board/";

export async function ListBoard() {
  try {
    const res = await fetch(DATA_SOURCE_URL + "list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const Boards: Board[] = await res.json();
    return Boards;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}

export async function GetBoard(id: number) {
  try {
    const res = await fetch(DATA_SOURCE_URL + "get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const Boards: Board = await res.json();
    return Boards;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}

export async function CreateBoard(board: any) {
  try {
    const res = await fetch(DATA_SOURCE_URL + "create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: board.name,
        imageUrl: board.imageUrl,
      }),
    });

    const newBoard: Board = await res.json();
    return newBoard; // Return the created board if successful
  } catch (error) {
    // Handle network errors or unexpected exceptions
    console.error("Error creating board:", error);
    return { error: "An unexpected error occurred." }; // Return a generic error message
  }
}

export async function UpdateBoard(request: Request) {
  const {
    id,
    code,
    name,
    description,
    imageUrl,
    isFavourite,
    createdAt,
    updatedAt,
    deletedAt,
    card,
  }: Partial<Board> = await request.json();

  const res = await fetch(DATA_SOURCE_URL + "update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      code,
      name,
      description,
      imageUrl,
      isFavourite,
      createdAt,
      updatedAt,
      card,
    }),
  });
  const newBoard: Board = await res.json();
  return newBoard;
}

export async function DeleteBoard(request: Request) {
  const { id }: Partial<Board> = await request.json();

  if (!id) return NextResponse.json({ message: "Board id required" });

  await fetch(DATA_SOURCE_URL + "delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return id;
}
