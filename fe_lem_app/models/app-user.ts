import { AppUserRoleMapping } from "./appUserRoleMapping";

export type AppUser = {
    id?: number;
    fullName: string;
    userName: string;
    email?: string;
    phone?: string;
    gender?: string;
    password: string;
    statusId: number;
    appUserRoleMappings?: AppUserRoleMapping[];
};