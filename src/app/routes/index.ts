import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { ClientRoutes } from "../modules/client/client.route";
import { EmployeeRoutes } from "../modules/employee/employee.route";
import { ProjectRoutes } from "../modules/project/project.route";
import { ServiceRoutes } from "../modules/service/service.route";

export const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },

  {
    path: "/client",
    route: ClientRoutes,
  },

  {
    path: "/employee",
    route: EmployeeRoutes,
  },
  {
    path: "/service",
    route: ServiceRoutes,
  },
  {
    path: "/project",
    route: ProjectRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

// router.use("/user", UserRoutes)
// router.use("/tour", TourRoutes)
// router.use("/division", DivisionRoutes)
// router.use("/booking", BookingRoutes)
// router.use("/user", UserRoutes)
