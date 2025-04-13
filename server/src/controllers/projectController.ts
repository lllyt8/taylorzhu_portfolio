// server/src/controllers/projectController.ts
import { Request, Response } from "express";
import Project from "../models/Project";

// 获取所有项目
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

// 获取单个项目
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await Project.findOne({ id: parseInt(req.params.id) });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ error: "Failed to fetch project" });
  }
};

// 创建新项目
export const createProject = async (req: Request, res: Response) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Failed to create project" });
  }
};

// 更新项目
export const updateProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      req.body,
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ error: "Failed to update project" });
  }
};

// 删除项目
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findOneAndDelete({
      id: parseInt(req.params.id),
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Failed to delete project" });
  }
};
