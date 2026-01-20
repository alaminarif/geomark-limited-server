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
exports.ClientService = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const client_model_1 = require("./client.model");
const client_constant_1 = require("./client.constant");
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const cloudinary_config_1 = require("../../config/cloudinary.config");
const createClient = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const exsitingClient = yield client_model_1.Client.findOne({ name: payload.name });
    if (exsitingClient) {
        throw new AppError_1.default(http_status_codes_1.default.CONFLICT, "Client with this name already exists");
    }
    const client = yield client_model_1.Client.create(payload);
    return client;
});
const updateClient = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingClient = yield client_model_1.Client.findById(id);
    if (!existingClient) {
        throw new Error("Client not found.");
    }
    const duplicateClient = yield client_model_1.Client.findOne({
        name: payload.name,
    });
    if (duplicateClient) {
        throw new Error("A Client with this name already exists.");
    }
    //
    const updatedClient = yield client_model_1.Client.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    if (payload.picture && existingClient.picture) {
        yield (0, cloudinary_config_1.deleteImageFromCLoudinary)(existingClient.picture);
    }
    return updatedClient;
});
const getAllClients = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBuilder = new QueryBuilder_1.QueryBuilder(client_model_1.Client.find(), query);
    const clients = yield queryBuilder.search(client_constant_1.clientSearchableFields).filter().sort().fields().paginate();
    // const meta = await queryBuilder.getMeta()
    const [data, meta] = yield Promise.all([clients.build(), queryBuilder.getMeta()]);
    return {
        data,
        meta,
    };
});
const getSingleClient = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield client_model_1.Client.findById(id);
    return {
        data: client,
    };
});
const deleteClient = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_model_1.Client.findByIdAndDelete(id);
});
exports.ClientService = {
    createClient,
    updateClient,
    getAllClients,
    getSingleClient,
    deleteClient,
};
