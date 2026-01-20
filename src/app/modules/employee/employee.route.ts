import { validateRequest } from "./../../middlewares/validateRequest";
import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { EmployeeController } from "./employee.controller";
import { createEmployeeZodSchema } from "./employee.validation";
import { multerUpload } from "../../config/multer.config";

const router = express.Router();
router.post(
  "/create-employee",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  multerUpload.single("file"),
  validateRequest(createEmployeeZodSchema),
  EmployeeController.createEmployee,
);

router.get("/", EmployeeController.getAllEmployees);
router.get("/:id", EmployeeController.getSingleEmployee);

router.delete("/:id", checkAuth(Role.SUPER_ADMIN, Role.ADMIN), EmployeeController.deleteEmployee);

export const EmployeeRoutes = router;
