import { Role } from "./enum";

export interface GetUserResponse {
  user: {
    id: number;
    createdAt: string;
    updatedAt: string;
    username: string;
    role: Role;
  };
}
