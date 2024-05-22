import { z } from "zod";

const reportLostItem = z.object({
  body: z.object({
    title: z.string({ required_error: "title is required" }),
  }),
});

const updateLostItem = z.object({
  body: z.object({}),
});

const lostItemSchemaValidation = { reportLostItem, updateLostItem };

export default lostItemSchemaValidation;
