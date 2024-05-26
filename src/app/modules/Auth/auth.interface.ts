export type TRegisterUser = {
  name?: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  photoURL?: string;
  phone?: string;
};

export type TLoginUser = {
  emailOrUsername: string;
  password: string;
};

export type TChangePassword = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
