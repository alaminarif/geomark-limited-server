import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { IClient } from "./client.interface";
import { Client } from "./client.model";
import { clientSearchableFields } from "./client.constant";
import { QueryBuilder } from "../../utils/QueryBuilder";

const createClient = async (payload: IClient) => {
  const exsitingClient = await Client.findOne({ name: payload.name });

  if (exsitingClient) {
    throw new AppError(httpStatus.CONFLICT, "Client with this name already exists");
  }

  const client = await Client.create(payload);
  return client;
};

const getAllClients = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Client.find(), query);

  const clients = await queryBuilder.search(clientSearchableFields).filter().sort().fields().paginate();

  // const meta = await queryBuilder.getMeta()

  const [data, meta] = await Promise.all([clients.build(), queryBuilder.getMeta()]);
  return {
    data,
    meta,
  };
};

const getSingleClient = async (id: string) => {
  const client = await Client.findById(id);
  return {
    data: client,
  };
};

const deleteClient = async (id: string) => {
  return await Client.findByIdAndDelete(id);
};

export const ClientService = {
  createClient,
  getAllClients,
  getSingleClient,
  deleteClient,
};
