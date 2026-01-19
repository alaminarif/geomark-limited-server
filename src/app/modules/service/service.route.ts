import { validateRequest } from "../../middlewares/validateRequest";
import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { ServiceController } from "./service.controller";
import { createServiceZodSchema } from "./service.validation";

const router = express.Router();
router.post("/create-service", checkAuth(Role.SUPER_ADMIN, Role.ADMIN), validateRequest(createServiceZodSchema), ServiceController.createService);

router.get("/", ServiceController.getAllServices);
router.get("/:email", ServiceController.getSingleService);

router.delete("/:id", checkAuth(Role.SUPER_ADMIN, Role.ADMIN), ServiceController.deleteService);

export const ServiceRoutes = router;
