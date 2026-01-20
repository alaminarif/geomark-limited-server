"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateServiceZodSchema = exports.createServiceZodSchema = void 0;
const zod_1 = require("zod");
exports.createServiceZodSchema = zod_1.z.object({
    name: zod_1.z.string({ invalid_type_error: "Name is required" }),
    description: zod_1.z.string({ invalid_type_error: "Description is required" }),
    picture: zod_1.z.string().optional(),
});
exports.updateServiceZodSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    description: zod_1.z.string().min(1).optional(),
    picture: zod_1.z.string().optional(),
});
// .refine((data) => Object.keys(data).length > 0, {
//   message: "At least one field must be updated",
// }),
