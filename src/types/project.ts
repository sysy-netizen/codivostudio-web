export type ProjectType = "tool" | "project";
export type ProjectCategory = "smartstore" | "automotive" | "data" | "automation" | "web" | "other";
export type ProjectStatus = "live" | "completed" | "in-progress";

export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  type: ProjectType;
  category: ProjectCategory;
  status: ProjectStatus;
  technologies: string[];
  thumbnail?: string;
  screenshots?: string[];
  problem?: string;
  solution?: string;
  features?: string[];
  outcome?: string;
  publicUrl?: string;
  githubUrl?: string;
  featured: boolean;
  published: boolean;
  publishedAt?: string;
}
