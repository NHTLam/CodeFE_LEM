import { AppUser } from "./app-user";

export interface AppUserBoardMapping {
    id: number;
    boardId: number;
    appUserId: number;
    appUserTypeId?: number;
    appUser?: AppUser;
  }