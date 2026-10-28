import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { CtaSection } from "@/components/shared/cta-section";
import { ProjectCard } from "@/components/tools/project-card";
import { StatusBadge } from "@/components/tools/status-badge";
import {
  categoryLabels,
  getProjectBySlug,
  getPublishedProjects,
  getRelatedProjects,
  typeLabels,
} from "@/lib/projects";
import { buildMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return getPublishedProjects().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return buildMetadata({
    title: `${project.title} | CODIVO STUDIO`,
    description: project.summary,
    path: `/tools/${project.slug}`,
  });
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border py-8">
      <h2 className="text-xl font-bold tracking-tight">{title}</h2>
      <div className="mt-4 text-[15px] leading-7 text-zinc-700 sm:text-base">{children}</div>
    </section>
  );
}

export default function ToolDetailPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();
  const related = getRelatedProjects(project);

  return (
    <>
      <div className="container-content py-12 text-center sm:py-16">
        <Link href="/tools" className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground">
          <ArrowLeft size={15} aria-hidden="true" /> 전체 프로젝트
        </Link>
        <div className="mx-auto mt-6 max-w-3xl">
          <div className="flex flex-wrap justify-center gap-1.5">
            <Badge variant="accent">{typeLabels[project.type]}</Badge>
            <Badge>{categoryLabels[project.category]}</Badge>
            <StatusBadge status={project.status} />
          </div>
          <h1 className="mt-4 text-[32px] font-bold leading-tight tracking-tight sm:text-5xl">{project.title}</h1>
          <p className="mt-4 text-base text-muted sm:text-lg">{project.summary}</p>
          {(project.publicUrl || project.githubUrl) && (
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {project.publicUrl && (
                <a href={project.publicUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants()}>
                  서비스 이용하기 <ExternalLink size={15} aria-hidden="true" />
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline" })}>
                  <Github size={15} aria-hidden="true" /> GitHub
                </a>
              )}
            </div>
          )}
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <Block title="프로젝트 소개">{project.description}</Block>
          {project.problem && <Block title="개발 배경과 문제">{project.problem}</Block>}
          {(project.solution || project.features?.length) && (
            <Block title="해결 방식과 핵심 기능">
              {project.solution && <p>{project.solution}</p>}
              {project.features && (
                <ul className="mt-3 list-inside list-disc space-y-1">
                  {project.features.map((f) => <li key={f}>{f}</li>)}
                </ul>
              )}
            </Block>
          )}
          <Block title="사용 기술">
            <ul className="flex flex-wrap justify-center gap-2">
              {project.technologies.map((t) => <li key={t}><Badge>{t}</Badge></li>)}
            </ul>
          </Block>
          {project.screenshots && project.screenshots.length > 0 && (
            <Block title="프로그램 화면">
              <div className="space-y-4">
                {project.screenshots.map((src, i) => (
                  <Image
                    key={src}
                    src={src}
                    alt={`${project.title} 스크린샷 ${i + 1}`}
                    width={1200}
                    height={750}
                    className="w-full rounded-card border border-border"
                  />
                ))}
              </div>
            </Block>
          )}
          {project.outcome && <Block title="결과 및 개선 사항">{project.outcome}</Block>}
        </div>

        {related.length > 0 && (
          <section className="mt-8 border-t border-border pt-10" aria-labelledby="related">
            <h2 id="related" className="text-xl font-bold tracking-tight">관련 프로젝트</h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.id} className="flex"><div className="flex w-full"><ProjectCard project={p} /></div></li>
              ))}
            </ul>
          </section>
        )}
      </div>
      <CtaSection />
    </>
  );
}
