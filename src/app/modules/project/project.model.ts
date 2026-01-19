import { model, Schema } from "mongoose";
import { IProject } from "./project.interface";

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    details: { type: String, required: true },
    status: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    client: { type: Schema.Types.ObjectId, ref: "Client", required: true },
    picture: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Project = model<IProject>("Project", ProjectSchema);
