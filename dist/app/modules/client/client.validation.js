"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateClientZodSchema = exports.createClientZodSchema = void 0;
const zod_1 = require("zod");
exports.createClientZodSchema = zod_1.z.object({
    name: zod_1.z.string({ invalid_type_error: "Name is required" }),
    email: zod_1.z.string({ invalid_type_error: "Email must be string" }).email({ message: "Invalid email address format." }),
    phone: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    picture: zod_1.z.string().optional(),
    joinDate: zod_1.z.string().optional(),
});
exports.updateClientZodSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    email: zod_1.z.string().email().optional(),
    phone: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    picture: zod_1.z.string().optional(),
    joinDate: zod_1.z.string().optional(),
});
// .refine((data) => Object.keys(data).length > 0, {
//   message: "At least one field must be updated",
// }),
