import { model, Schema } from "mongoose";
import { IService } from "./service.interface";

const ServiceSchema = new Schema<IService>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    picture: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Service = model<IService>("Service", ServiceSchema);
