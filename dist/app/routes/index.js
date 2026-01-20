"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const client_route_1 = require("../modules/client/client.route");
const employee_route_1 = require("../modules/employee/employee.route");
const project_route_1 = require("../modules/project/project.route");
const service_route_1 = require("../modules/service/service.route");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/client",
        route: client_route_1.ClientRoutes,
    },
    {
        path: "/employee",
        route: employee_route_1.EmployeeRoutes,
    },
    {
        path: "/service",
        route: service_route_1.ServiceRoutes,
    },
    {
        path: "/project",
        route: project_route_1.ProjectRoutes,
    },
];
moduleRoutes.forEach((route) => {
    exports.router.use(route.path, route.route);
});
// router.use("/user", UserRoutes)
// router.use("/tour", TourRoutes)
// router.use("/division", DivisionRoutes)
// router.use("/booking", BookingRoutes)
// router.use("/user", UserRoutes)
