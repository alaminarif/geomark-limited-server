import { validateRequest } from "./../../middlewares/validateRequest";
import express from "express";
import { ClientController } from "./client.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { createClientZodSchema } from "./client.validation";

const router = express.Router();
router.post("/create-client", checkAuth(Role.SUPER_ADMIN, Role.ADMIN), validateRequest(createClientZodSchema), ClientController.createClient);

router.get("/", ClientController.getAllClients);
router.get("/:email", ClientController.getSingleClient);

router.delete("/:id", checkAuth(Role.SUPER_ADMIN, Role.ADMIN), ClientController.deleteClient);

export const ClientRoutes = router;
