import { AppUser } from "./app-user";

export interface CreateBoardsFunction {
  numberOfGroups: number;
  classroomId: number;
  appUserIds: number[];
}