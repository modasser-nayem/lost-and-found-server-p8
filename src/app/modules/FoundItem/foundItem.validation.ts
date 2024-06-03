import { z } from "zod";

const reportFoundItem = z.object({
  body: z.object({
    title: z.string({ required_error: "title is required" }),
    description: z.string({ required_error: "description is required" }),
    category: z.string({ required_error: "category is required" }),
    brand: z.string({ required_error: "brand is required" }),
    foundDate: z.string({ required_error: "foundDate is required" }),
    foundLocation: z.string({ required_error: "foundLocation is required" }),
    images: z
      .array(z.string())
      .optional()
      .refine((value) => !value || value.length <= 3, {
        message: "Can't select more than 3 images",
      }),
    username: z.string().optional(),
    email: z.string(),
    phone: z.string().optional(),
  }),
});

const updateFoundItem = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    category: z.string().optional(),
    brand: z.string().optional(),
    foundDate: z.date().optional(),
    foundLocation: z.date().optional(),
    images: z.array(z.string()).optional(),
    username: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
  }),
});

const foundItemSchemaValidation = { reportFoundItem, updateFoundItem };

export default foundItemSchemaValidation;
