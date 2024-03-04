import { Role } from "./role.enum";

export interface User {
    email: string;
    displayName: string;
    role: Role;
    avatar?: string;
}