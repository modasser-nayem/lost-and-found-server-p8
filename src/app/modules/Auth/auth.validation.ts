import { z } from "zod";

const registerUser = z.object({
  body: z.object({
    name: z
      .string({ required_error: "name is required" })
      .refine((value) => value !== "", { message: "Please provide your name" }),
    username: z
      .string({ required_error: "username is required" })
      .refine((value) => value !== "", {
        message: "Please provide your username",
      })
      .refine((value) => !/\s/.test(value), {
        message: "Username not allow any white space",
      }),
    email: z
      .string({ required_error: "email is required" })
      .email({ message: "invalid email address" }),
    password: z
      .string({ required_error: "password is required" })
      .min(6, { message: "Password can't be less then 6 character" }),
    photoURL: z.string().optional(),
    phone: z.string().optional(),
  }),
});

const loginUser = z.object({
  body: z.object({
    email: z
      .string({ required_error: "email is required" })
      .email({ message: "invalid email address" }),
    password: z
      .string({ required_error: "password is required" })
      .refine((value) => value !== "", {
        message: "Please provide your password",
      }),
  }),
});

const changePassword = z.object({
  body: z
    .object({
      currentPassword: z.string({
        required_error: "currentPassword is required",
      }),
      newPassword: z.string({ required_error: "newPassword is required" }),
      confirmPassword: z.string({
        required_error: "confirmPassword is required",
      }),
    })
    .refine((value) => value.newPassword === value.confirmPassword, {
      message: "Confirm Password does't match",
    }),
});

const authSchemaValidation = { registerUser, loginUser, changePassword };
export default authSchemaValidation;
