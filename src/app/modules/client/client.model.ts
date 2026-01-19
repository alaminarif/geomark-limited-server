import { model, Schema } from "mongoose";
import { IClient } from "./client.interface";

const clientSchema = new Schema<IClient>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    address: { type: String },
    picture: { type: String },
    joinDate: { type: Date },
  },
  {
    timestamps: true,
  },
);

export const Client = model<IClient>("Client", clientSchema);
