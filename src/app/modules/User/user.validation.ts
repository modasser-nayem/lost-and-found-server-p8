import { z } from "zod";

const updateMyProfile = z.object({
  body: z.object({
    name: z
      .string()
      .refine((value) => value !== "", { message: "Please provide your name" })
      .optional(),
    username: z
      .string()
      .refine((value) => value !== "", {
        message: "Please provide your username",
      })
      .refine((value) => !/\s/.test(value), {
        message: "Username not allow any white space",
      })
      .optional(),
    email: z.string().email({ message: "invalid email address" }).optional(),
    photoURL: z.string().optional(),
    phone: z.string().optional(),
  }),
});

const updateUserRole = z.object({
  body: z.object({
    userId: z
      .string({ required_error: "userId is required" })
      .refine((value) => value !== "", { message: "User id is required" })
      .optional(),
    role: z.enum(["admin", "user"]),
  }),
});

const updateUserStatus = z.object({
  body: z.object({
    userId: z
      .string({ required_error: "userId is required" })
      .refine((value) => value !== "", { message: "User id is required" })
      .optional(),
    status: z.enum(["activate", "deactivate"]),
  }),
});

const userSchemaValidation = {
  updateMyProfile,
  updateUserRole,
  updateUserStatus,
};
export default userSchemaValidation;
