import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { categoryLabels, statusLabels, typeLabels } from "@/lib/projects";
import type { Project } from "@/types/project";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex flex-col text-center overflow-hidden rounded-card border border-border bg-surface transition-colors hover:border-zinc-400">
      {project.thumbnail && (
        <Image
          src={project.thumbnail}
          alt={`${project.title} 화면`}
          width={640}
          height={360}
          className="aspect-video w-full border-b border-border object-cover"
        />
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap justify-center gap-1.5">
          <Badge variant="accent">{typeLabels[project.type]}</Badge>
          <Badge>{categoryLabels[project.category]}</Badge>
          <Badge>{statusLabels[project.status]}</Badge>
        </div>
        <h3 className="mt-4 text-lg font-bold tracking-tight">
          <Link
            href={`/tools/${project.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-[15px] text-muted">{project.summary}</p>
        <ul className="mt-4 flex flex-wrap justify-center gap-1.5" aria-label="사용 기술">
          {project.technologies.map((t) => (
            <li key={t} className="text-xs text-muted">
              #{t}
            </li>
          ))}
        </ul>
        <span className="mt-5 inline-flex items-center justify-center gap-1 text-sm font-medium text-accent">
          자세히 보기 <ArrowUpRight size={15} aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
