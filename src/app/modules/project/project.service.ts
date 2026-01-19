import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";

import { clientSearchableFields } from "./project.constant";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { IProject } from "./project.interface";
import { Project } from "./project.model";

const createProject = async (payload: IProject) => {
  const existingProject = await Project.findOne({ name: payload.name });

  if (existingProject) {
    throw new AppError(httpStatus.CONFLICT, "Project with this name already exists");
  }

  const project = await Project.create(payload);
  return project;
};

const getAllProjects = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Project.find(), query);

  const projects = await queryBuilder.search(clientSearchableFields).filter().sort().fields().paginate();

  // const meta = await queryBuilder.getMeta()

  const [data, meta] = await Promise.all([projects.build(), queryBuilder.getMeta()]);
  return {
    data,
    meta,
  };
};

const getSingleProject = async (email: string) => {
  const project = await Project.findOne({ email });
  return {
    data: project,
  };
};

const deleteProject = async (id: string) => {
  return await Project.findByIdAndDelete(id);
};

export const ProjectService = {
  createProject,
  getAllProjects,
  getSingleProject,
  deleteProject,
};
