import { projects } from "@/data/projects";
import type { Project, ProjectCategory, ProjectStatus, ProjectType } from "@/types/project";

export const typeLabels: Record<ProjectType, string> = {
  tool: "사용 가능한 도구",
  project: "개발 프로젝트",
};

export const categoryLabels: Record<ProjectCategory, string> = {
  smartstore: "스마트스토어 셀러용",
  automotive: "Automotive Data",
  data: "Data Processing",
  automation: "Automation",
  web: "Web Application",
  other: "Other",
};

export const statusLabels: Record<ProjectStatus, string> = {
  live: "운영 중",
  completed: "완료",
  "in-progress": "진행 중",
};

export function getPublishedProjects(): Project[] {
  const seen = new Set<string>();
  return projects.filter((p) => {
    if (!p.published || seen.has(p.slug)) return false;
    seen.add(p.slug);
    return true;
  });
}

export function getFeaturedProjects(limit = 3): Project[] {
  return getPublishedProjects().filter((p) => p.featured).slice(0, limit);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getPublishedProjects().find((p) => p.slug === slug);
}

export function getRelatedProjects(project: Project, limit = 2): Project[] {
  return getPublishedProjects()
    .filter((p) => p.slug !== project.slug)
    .sort((a, b) => Number(b.category === project.category) - Number(a.category === project.category))
    .slice(0, limit);
}
