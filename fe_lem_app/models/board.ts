import { Card } from "./card";

export type Board = {
  id: number;
  code: string;
  name: string;
  description?: string;
  imageUrl?: string;
  isFavourite?: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  card?: Card[];
};