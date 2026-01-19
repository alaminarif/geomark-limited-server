import { z } from "zod";

export const createClientZodSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Name is required" }),

    email: z.string().email({ message: "Invalid email address format." }),

    phone: z.string().optional(),
    address: z.string().optional(),
    picture: z.string().optional(),

    // If joinDate comes from request body (JSON), it must be coerced
    joinDate: z.string().optional(),
  }),
});

export const updateClientZodSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    picture: z.string().optional(),
    joinDate: z.string().optional(),
  }),
  // .refine((data) => Object.keys(data).length > 0, {
  //   message: "At least one field must be updated",
  // }),
});
