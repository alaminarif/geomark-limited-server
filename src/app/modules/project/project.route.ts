import { validateRequest } from "../../middlewares/validateRequest";
import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { createProjectZodSchema, updateProjectZodSchema } from "./project.validation";
import { ProjectController } from "./project.controller";
import { multerUpload } from "../../config/multer.config";

const router = express.Router();
router.post(
  "/create-project",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  multerUpload.single("file"),
  validateRequest(createProjectZodSchema),
  ProjectController.createProject,
);

router.get("/", ProjectController.getAllProjects);

router.patch(
  "/:id",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  multerUpload.single("file"),
  validateRequest(updateProjectZodSchema),
  ProjectController.updateProject,
);
router.get("/:id", ProjectController.getSingleProject);

router.delete("/:id", checkAuth(Role.SUPER_ADMIN, Role.ADMIN), ProjectController.deleteProject);

export const ProjectRoutes = router;
