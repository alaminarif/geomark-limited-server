import { validateRequest } from "./../../middlewares/validateRequest";
import express from "express";
import { ClientController } from "./client.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { createClientZodSchema, updateClientZodSchema } from "./client.validation";
import { multerUpload } from "../../config/multer.config";

const router = express.Router();
router.post(
  "/create-client",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  multerUpload.single("file"),
  validateRequest(createClientZodSchema),
  ClientController.createClient,
);
router.patch(
  "/:id",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  multerUpload.single("file"),
  validateRequest(updateClientZodSchema),
  ClientController.updateClient,
);

router.get("/", ClientController.getAllClients);
router.get("/:id", ClientController.getSingleClient);

router.delete("/:id", checkAuth(Role.SUPER_ADMIN, Role.ADMIN), ClientController.deleteClient);

export const ClientRoutes = router;
