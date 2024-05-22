export type TRegisterUser = {
  name: string;
  username: string;
  email: string;
  password: string;
  photoURL?: string;
  phone?: string;
};

export type TLoginUser = {
  email: string;
  password: string;
};

export type TChangePassword = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
