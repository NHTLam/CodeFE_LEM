import { Card } from "./card";
import { AppUserBoardMapping } from "./appUserBoardMapping";

export type Board = {
  id?: number;
  code?: string;
  name?: string;
  description?: string;
  isFavourite?: boolean;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  appUserBoardMappings?: AppUserBoardMapping[];
  cards?: Card[];
};