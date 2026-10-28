import { cn } from "@/lib/utils";
import { statusLabels } from "@/lib/projects";
import type { ProjectStatus } from "@/types/project";

const styles: Record<ProjectStatus, { badge: string; dot: string }> = {
  live: { badge: "border-green-300 bg-green-50 text-green-700", dot: "bg-green-500" },
  completed: { badge: "border-border bg-zinc-50 text-zinc-700", dot: "bg-zinc-400" },
  "in-progress": { badge: "border-amber-300 bg-amber-50 text-amber-700", dot: "bg-amber-500" },
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const s = styles[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-0.5 text-[13px] font-semibold",
        s.badge
      )}
    >
      <span className={cn("h-2 w-2 rounded-full", s.dot)} aria-hidden="true" />
      {statusLabels[status]}
    </span>
  );
}
