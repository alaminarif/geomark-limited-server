import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { EmployeeService } from "./employee.service";

const createEmployee = catchAsync(async (req: Request, res: Response) => {
  // const payload: IEmployee = {
  //   ...req.body,
  //   images: (req.files as Express.Multer.File[]).map((file) => file.path),
  // };

  const payload = req.body;

  const result = await EmployeeService.createEmployee(payload);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Employee created successfully",
    data: result,
  });
});

const getAllEmployees = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;

  const result = await EmployeeService.getAllEmployees(query as Record<string, string>);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Employees retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getSingleEmployee = catchAsync(async (req: Request, res: Response) => {
  const email = req.params.email as string;

  const result = await EmployeeService.getSingleEmployee(email);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Employee retrieved successfully",
    data: result,
  });
});

// const updateEmployee = catchAsync(async (req: Request, res: Response) => {
//   const payload: IEmployee = {
//     ...req.body,
//     images: (req.files as Express.Multer.File[]).map((file) => file.path),
//   };
//   const result = await EmployeeService.updateEmployee(req.params.id, payload);
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: "Employee updated successfully",
//     data: result,
//   });
// });

const deleteEmployee = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const result = await EmployeeService.deleteEmployee(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Employee deleted successfully",
    data: result,
  });
});

export const EmployeeController = {
  createEmployee,
  getAllEmployees,
  getSingleEmployee,
  // updateEmployee,
  deleteEmployee,
};
