import { AppUserClassroomMapping } from "./appUserClassroomMapping";

export type AppUser = {
    id?: number;
    fullName: string;
    userName: string;
    email?: string;
    phone?: string;
    gender?: string;
    password: string;
    statusId: number;
    appUserClassroomMappings?: AppUserClassroomMapping[];
};