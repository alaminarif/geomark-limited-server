import { z } from "zod";
import { ProjectStatus } from "./project.interface";

export const createProjectZodSchema = z.object({
  title: z.string({ invalid_type_error: "Title is required" }),
  name: z.string({ invalid_type_error: "Name is required" }),
  description: z.string({ invalid_type_error: "Description is required" }),
  details: z.string({ invalid_type_error: "Details is required" }),
  status: z.enum(Object.values(ProjectStatus) as [string]),
  startDate: z.string({ invalid_type_error: "Start Date is required" }),
  endDate: z.string({ invalid_type_error: "End Date is required" }),
  client: z.string({ invalid_type_error: "Client ID is required" }),
  picture: z.string().optional(),
});

export const updateProjectZodSchema = z.object({});
// .refine((data) => Object.keys(data).length > 0, {
//   message: "At least one field must be updated",
// }),
