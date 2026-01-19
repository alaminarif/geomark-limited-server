import { z } from "zod";

export const createServiceZodSchema = z.object({
  name: z.string({ invalid_type_error: "Name is required" }),
  description: z.string({ invalid_type_error: "Description is required" }),
  picture: z.string().optional(),
});

export const updateServiceZodSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  picture: z.string().optional(),
});
// .refine((data) => Object.keys(data).length > 0, {
//   message: "At least one field must be updated",
// }),
