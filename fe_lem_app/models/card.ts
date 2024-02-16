import { Board } from "./board";
import { Job } from "./job";

export interface Card {
    id: number;
    boardId: number;
    name: string;
    order?: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    board: Board;
    jobs?: Job[];
  }