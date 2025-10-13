import { z } from "zod";

export const productSchema = z.object({
  modelName: z.string().min(3, "Name must be at least 3 characters long"),
  quantity: z.number(),
});
export type ProductSchemaType = z.infer<typeof productSchema>;

export const productStatusSchema = z.object({
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"]),
});
export type ProductStatusSchemaType = z.infer<typeof productStatusSchema>;
