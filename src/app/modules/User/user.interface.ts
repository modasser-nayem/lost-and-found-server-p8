import { UserRole, UserStatus } from "@prisma/client";

export type TUpdateUserRole = {
  userId: string;
  role: UserRole;
};

export type TUpdateUserStatus = {
  userId: string;
  status: UserStatus;
};

export type TUpdateUserProfile = {
  name: string;
  username: string;
  email: string;
  photoURL: string;
  phone: string;
};
