"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const employee_model_1 = require("./employee.model");
const employee_constant_1 = require("./employee.constant");
const cloudinary_config_1 = require("../../config/cloudinary.config");
const createEmployee = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingEmployee = yield employee_model_1.Employee.findOne({ email: payload.email });
    if (existingEmployee) {
        throw new AppError_1.default(http_status_codes_1.default.CONFLICT, "Employee with this email already exists");
    }
    const employee = yield employee_model_1.Employee.create(payload);
    return employee;
});
const updateEmployee = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingEmployee = yield employee_model_1.Employee.findById(id);
    if (!existingEmployee) {
        throw new Error("Employee not found.");
    }
    const duplicateEmployee = yield employee_model_1.Employee.findOne({
        email: payload.email,
    });
    if (duplicateEmployee) {
        throw new Error("An Employee with this email already exists.");
    }
    const updatedEmployee = yield employee_model_1.Employee.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    if (payload.picture && existingEmployee.picture) {
        yield (0, cloudinary_config_1.deleteImageFromCLoudinary)(existingEmployee.picture);
    }
    return updatedEmployee;
});
const getAllEmployees = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBuilder = new QueryBuilder_1.QueryBuilder(employee_model_1.Employee.find(), query);
    const employees = yield queryBuilder.search(employee_constant_1.employeeSearchableFields).filter().sort().fields().paginate();
    // const meta = await queryBuilder.getMeta()
    const [data, meta] = yield Promise.all([employees.build(), queryBuilder.getMeta()]);
    return {
        data,
        meta,
    };
});
const getSingleEmployee = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const employee = yield employee_model_1.Employee.findById(id);
    return {
        data: employee,
    };
});
const deleteEmployee = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield employee_model_1.Employee.findByIdAndDelete(id);
});
exports.EmployeeService = {
    createEmployee,
    updateEmployee,
    getAllEmployees,
    getSingleEmployee,
    deleteEmployee,
};
