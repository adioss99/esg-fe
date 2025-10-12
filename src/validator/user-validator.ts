import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
export type LoginSchemaType = z.infer<typeof loginSchema>;

export const updateUserSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  role: z.enum(["QC", "ADMIN", "PACKING"]),
});
export type UpdateUserSchemaType = z.infer<typeof updateUserSchema>;

export const registerSchema = updateUserSchema.extend({
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
export type RegisterSchemaType = z.infer<typeof registerSchema>;
