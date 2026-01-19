import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ClientService } from "./client.service";
import { IClient } from "./client.interface";

const createClient = catchAsync(async (req: Request, res: Response) => {
  const payload: IClient = {
    ...req.body,
    images: (req.files as Express.Multer.File[]).map((file) => file.path),
  };

  // const payload = req.body;
  const result = await ClientService.createClient(payload);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Client created successfully",
    data: result,
  });
});

const getAllClients = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;

  const result = await ClientService.getAllClients(query as Record<string, string>);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Clients retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getSingleClient = catchAsync(async (req: Request, res: Response) => {
  const email = req.params.email as string;

  const result = await ClientService.getSingleClient(email);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Client retrieved successfully",
    data: result,
  });
});

// const updateClient = catchAsync(async (req: Request, res: Response) => {
//   const payload: IClient = {
//     ...req.body,
//     images: (req.files as Express.Multer.File[]).map((file) => file.path),
//   };
//   const result = await ClientService.updateClient(req.params.id, payload);
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: "Client updated successfully",
//     data: result,
//   });
// });

const deleteClient = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const result = await ClientService.deleteClient(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Client deleted successfully",
    data: result,
  });
});

export const ClientController = {
  createClient,
  getAllClients,
  getSingleClient,
  // updateClient,
  deleteClient,
};
