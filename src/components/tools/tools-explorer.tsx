"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { categoryLabels, typeLabels } from "@/lib/projects";
import { ProjectCard } from "./project-card";
import type { Project, ProjectCategory, ProjectType } from "@/types/project";

type TypeFilter = "all" | ProjectType;
type CategoryFilter = "all" | ProjectCategory;

const typeOptions: { value: TypeFilter; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "tool", label: typeLabels.tool },
  { value: "project", label: typeLabels.project },
];

const categoryOptions: { value: CategoryFilter; label: string }[] = [
  { value: "all", label: "전체" },
  ...(Object.keys(categoryLabels) as ProjectCategory[]).map((value) => ({
    value,
    label: categoryLabels[value],
  })),
];

function FilterGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm text-muted">{label}</span>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
            value === o.value
              ? "border-accent bg-accent text-white"
              : "border-border bg-surface text-foreground hover:bg-zinc-100"
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function ToolsExplorer({ projects }: { projects: Project[] }) {
  const [type, setType] = useState<TypeFilter>("all");
  const [category, setCategory] = useState<CategoryFilter>("all");

  const filtered = useMemo(
    () =>
      projects.filter(
        (p) => (type === "all" || p.type === type) && (category === "all" || p.category === category)
      ),
    [projects, type, category]
  );

  return (
    <div>
      <div className="flex flex-col gap-4">
        <FilterGroup label="유형" options={typeOptions} value={type} onChange={setType} />
        <FilterGroup label="분류" options={categoryOptions} value={category} onChange={setCategory} />
      </div>

      <p className="mt-8 text-sm text-muted" aria-live="polite">
        {filtered.length}개의 프로젝트
      </p>

      {filtered.length > 0 ? (
        <ul className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <li key={p.id} className="flex">
              <div className="flex w-full">
                <ProjectCard project={p} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 rounded-card border border-dashed border-border bg-surface px-6 py-14 text-center">
          <p className="font-medium">조건에 맞는 프로젝트가 없습니다.</p>
          <p className="mt-1 text-sm text-muted">다른 조건을 선택하거나 전체 프로젝트를 확인해 보세요.</p>
          <Button
            variant="outline"
            className="mt-5"
            onClick={() => {
              setType("all");
              setCategory("all");
            }}
          >
            전체 보기
          </Button>
        </div>
      )}
    </div>
  );
}
