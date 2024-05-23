import { z } from "zod";

const createClaimRequest = z.object({
  body: z.object({
    itemId: z
      .string({ required_error: "itemId is required" })
      .refine((value) => value !== "", {
        message: "item id is required",
      }),
    description: z
      .string({ required_error: "description is required" })
      .refine((value) => value !== "", {
        message: "description id is required",
      }),
    productInvoice: z
      .string({ required_error: "productInvoice is required" })
      .refine((value) => value !== "", { message: "Invoice url is required" }),
    images: z
      .array(
        z.string().refine((value) => value !== "", {
          message: "image url is required",
        }),
      )
      .optional(),
  }),
});

const updateClaimRequest = z.object({
  body: z.object({
    description: z
      .string()
      .refine((value) => value !== "", {
        message: "description id is required",
      })
      .optional(),
    productInvoice: z
      .string()
      .refine((value) => value !== "", { message: "Invoice url is required" })
      .optional(),
    images: z
      .array(
        z.string().refine((value) => value !== "", {
          message: "image url is required",
        }),
      )
      .optional(),
  }),
});

const updateClaimStatus = z.object({
  body: z.object({
    status: z.enum(["pending", "approved", "rejected"]),
  }),
});

const claimItemSchemaValidation = {
  createClaimRequest,
  updateClaimRequest,
  updateClaimStatus,
};
export default claimItemSchemaValidation;
