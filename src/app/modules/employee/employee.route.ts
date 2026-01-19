import { validateRequest } from "./../../middlewares/validateRequest";
import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { EmployeeController } from "./employee.controller";
import { createEmployeeZodSchema } from "./employee.validation";

const router = express.Router();
router.post("/create-employee", checkAuth(Role.SUPER_ADMIN, Role.ADMIN), validateRequest(createEmployeeZodSchema), EmployeeController.createEmployee);

router.get("/", EmployeeController.getAllEmployees);
router.get("/:email", EmployeeController.getSingleEmployee);

router.delete("/:id", checkAuth(Role.SUPER_ADMIN, Role.ADMIN), EmployeeController.deleteEmployee);

export const EmployeeRoutes = router;
