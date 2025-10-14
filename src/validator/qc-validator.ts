import { z } from "zod";

export const qcSchema = z.object({
  passed: z.enum(["true", "false"]),
  notes: z.string().max(100).nullable(),
});
export type QcSchemaType = z.infer<typeof qcSchema>;
