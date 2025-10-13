import { z } from "zod";

export const qcSchema = z.object({
  passed: z.coerce.boolean(),
  notes: z.string().nullable(),
});
export type QcSchemaType = z.infer<typeof qcSchema>;
