
export interface AppUserClassroomMapping {
  id: number;
  classroomId: number;
  appUserId: number;
  roleId?: number;
  role?: Role;
}

export interface Role {
  id: number;
  roleTypeId: number;
  name: string;
  descrription?: string;
}