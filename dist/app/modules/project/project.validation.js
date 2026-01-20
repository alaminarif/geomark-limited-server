"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectZodSchema = exports.createProjectZodSchema = void 0;
const zod_1 = require("zod");
const project_interface_1 = require("./project.interface");
exports.createProjectZodSchema = zod_1.z.object({
    title: zod_1.z.string({ invalid_type_error: "Title is required" }),
    name: zod_1.z.string({ invalid_type_error: "Name is required" }),
    description: zod_1.z.string({ invalid_type_error: "Description is required" }),
    details: zod_1.z.string({ invalid_type_error: "Details is required" }),
    status: zod_1.z.enum(Object.values(project_interface_1.ProjectStatus)),
    startDate: zod_1.z.string({ invalid_type_error: "Start Date is required" }),
    endDate: zod_1.z.string({ invalid_type_error: "End Date is required" }),
    client: zod_1.z.string({ invalid_type_error: "Client ID is required" }),
    picture: zod_1.z.string().optional(),
});
exports.updateProjectZodSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    details: zod_1.z.string().optional(),
    status: zod_1.z.enum(Object.values(project_interface_1.ProjectStatus)).optional(),
    startDate: zod_1.z.string().optional(),
    endDate: zod_1.z.string().optional(),
    client: zod_1.z.string().optional(),
    picture: zod_1.z.string().optional(),
});
