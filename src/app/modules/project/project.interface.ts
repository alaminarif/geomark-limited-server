import { Types } from "mongoose";

export enum ProjectStatus {
  UPCOMING = "UPCOMING",
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
}

export interface IProject {
  title: string;
  name: string;
  description: string;
  details: string;
  status: ProjectStatus;
  startDate: Date;
  endDate: Date;
  picture?: string;
  client: Types.ObjectId;
}
