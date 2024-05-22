import { z } from "zod";

const reportFoundItem = z.object({
  body: z.object({}),
});

const updateFoundItem = z.object({
  body: z.object({}),
});

const foundItemSchemaValidation = { reportFoundItem, updateFoundItem };

export default foundItemSchemaValidation;
