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
exports.ServiceService = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const service_constant_1 = require("./service.constant");
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const service_model_1 = require("./service.model");
const cloudinary_config_1 = require("../../config/cloudinary.config");
const createService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const exsitingService = yield service_model_1.Service.findOne({ name: payload.name });
    if (exsitingService) {
        throw new AppError_1.default(http_status_codes_1.default.CONFLICT, "Service with this name already exists");
    }
    const service = yield service_model_1.Service.create(payload);
    return service;
});
const updateService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingService = yield service_model_1.Service.findById(id);
    const existingServiceName = yield service_model_1.Service.findOne({ name: payload.name });
    if (!existingService) {
        throw new Error("Service not found.");
    }
    if (existingServiceName) {
        throw new AppError_1.default(http_status_codes_1.default.CONFLICT, "Service with this name already exists");
    }
    const duplicateProject = yield service_model_1.Service.findOne({
        name: payload.name,
    });
    if (duplicateProject) {
        throw new Error("A Service with this name already exists.");
    }
    //
    const updatedProject = yield service_model_1.Service.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    if (payload.picture && existingService.picture) {
        yield (0, cloudinary_config_1.deleteImageFromCLoudinary)(existingService.picture);
    }
    return updatedProject;
});
const getAllServices = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBuilder = new QueryBuilder_1.QueryBuilder(service_model_1.Service.find(), query);
    const services = yield queryBuilder.search(service_constant_1.serviceSearchableFields).filter().sort().fields().paginate();
    // const meta = await queryBuilder.getMeta()
    const [data, meta] = yield Promise.all([services.build(), queryBuilder.getMeta()]);
    return {
        data,
        meta,
    };
});
const getSingleService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield service_model_1.Service.findById(id);
    return {
        data: service,
    };
});
const deleteService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield service_model_1.Service.findByIdAndDelete(id);
});
exports.ServiceService = {
    createService,
    updateService,
    getAllServices,
    getSingleService,
    deleteService,
};
