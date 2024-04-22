  export interface AppUserRoleMapping {
    id: number;
    roleId: number;
    appUserId: number;
    appUserTypeId: number;
    role: Role;
  }

  export interface Role {
    id: number;
    name: string;
    description: string;
  }