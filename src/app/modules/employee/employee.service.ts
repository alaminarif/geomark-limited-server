import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";

import { QueryBuilder } from "../../utils/QueryBuilder";
import { Employee } from "./employee.model";
import { IEmployee } from "./employee.interface";
import { employeeSearchableFields } from "./employee.constant";

const createEmployee = async (payload: IEmployee) => {
  const existingEmployee = await Employee.findOne({ name: payload.name });

  if (existingEmployee) {
    throw new AppError(httpStatus.CONFLICT, "Employee with this name already exists");
  }

  const employee = await Employee.create(payload);
  return employee;
};

const getAllEmployees = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Employee.find(), query);

  const employees = await queryBuilder.search(employeeSearchableFields).filter().sort().fields().paginate();

  // const meta = await queryBuilder.getMeta()

  const [data, meta] = await Promise.all([employees.build(), queryBuilder.getMeta()]);
  return {
    data,
    meta,
  };
};

const getSingleEmployee = async (id: string) => {
  const employee = await Employee.findById(id);
  return {
    data: employee,
  };
};

const deleteEmployee = async (id: string) => {
  return await Employee.findByIdAndDelete(id);
};

export const EmployeeService = {
  createEmployee,
  getAllEmployees,
  getSingleEmployee,
  deleteEmployee,
};
