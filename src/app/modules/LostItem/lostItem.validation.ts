import { z } from "zod";

const reportLostItem = z.object({
  body: z.object({}),
});

const updateLostItem = z.object({
  body: z.object({}),
});

const lostItemSchemaValidation = { reportLostItem, updateLostItem };

export default lostItemSchemaValidation;
