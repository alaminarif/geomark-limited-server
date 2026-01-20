import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { IService } from "./service.interface";
import { serviceSearchableFields } from "./service.constant";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { Service } from "./service.model";

const createService = async (payload: IService) => {
  const exsitingService = await Service.findOne({ name: payload.name });

  if (exsitingService) {
    throw new AppError(httpStatus.CONFLICT, "Service with this name already exists");
  }

  const service = await Service.create(payload);
  return service;
};

const getAllServices = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Service.find(), query);

  const services = await queryBuilder.search(serviceSearchableFields).filter().sort().fields().paginate();

  // const meta = await queryBuilder.getMeta()

  const [data, meta] = await Promise.all([services.build(), queryBuilder.getMeta()]);
  return {
    data,
    meta,
  };
};

const getSingleService = async (id: string) => {
  const service = await Service.findById(id);
  return {
    data: service,
  };
};

const deleteService = async (id: string) => {
  return await Service.findByIdAndDelete(id);
};

export const ServiceService = {
  createService,
  getAllServices,
  getSingleService,
  deleteService,
};
