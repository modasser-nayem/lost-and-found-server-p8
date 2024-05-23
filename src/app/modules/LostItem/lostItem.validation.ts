import { z } from "zod";

const reportLostItem = z.object({
  body: z.object({
    title: z.string({ required_error: "title is required" }),
    description: z.string({ required_error: "description is required" }),
    category: z.string({ required_error: "category is required" }),
    brand: z.string({ required_error: "brand is required" }),
    lostDate: z.string({ required_error: "lostDate is required" }),
    lostLocation: z.string({ required_error: "lostLocation is required" }),
    images: z.array(z.string()).optional(),
    username: z.string().optional(),
    email: z.string(),
    phone: z.string().optional(),
  }),
});

const updateLostItem = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    category: z.string().optional(),
    brand: z.string().optional(),
    lostDate: z.date().optional(),
    lostLocation: z.date().optional(),
    images: z.array(z.string()).optional(),
    username: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
  }),
});

const lostItemSchemaValidation = { reportLostItem, updateLostItem };

export default lostItemSchemaValidation;
