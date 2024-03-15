import { Role } from './role.enum';

export interface User {
  id?: number;
  email: string;
  displayName: string;
  role: Role;
  avatar?: string;
}

export interface UserList {
  users: User[];
  totalCount: number;
  lastPage: number;
}
