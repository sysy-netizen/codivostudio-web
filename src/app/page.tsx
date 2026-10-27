import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/shared/icon";
import { CtaSection } from "@/components/shared/cta-section";
import { ProjectCard } from "@/components/tools/project-card";
import { approach, expertise, solutions } from "@/data/services";
import { site } from "@/data/site";
import { getFeaturedProjects } from "@/lib/projects";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "CODIVO STUDIO | 데이터 분석 & 소프트웨어 개발",
  description: site.description,
  path: "/",
});

export default function HomePage() {
  const featured = getFeaturedProjects(3);

  return (
    <>
      <section className="border-b border-border">
        <div className="container-content py-20 sm:py-28">
          <p className="eyebrow">AUTOMOTIVE DATA · PYTHON · AI DEVELOPMENT</p>
          <h1 className="mt-5 max-w-3xl text-[36px] font-bold leading-[1.2] tracking-tight sm:text-5xl lg:text-[64px]">
            데이터를 분석하고,
            <br />
            기술로 해결합니다.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-muted sm:text-lg">
            자동차 데이터 분석부터 Python 기반 업무 자동화와 소프트웨어 개발까지. 실무의 문제를 이해하고, 실제로
            작동하는 솔루션을 만듭니다.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/tools" className={buttonVariants()}>
              프로젝트 보기 <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/contact" className={buttonVariants({ variant: "outline" })}>
              프로젝트 문의
            </Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="expertise">
        <div className="container-content">
          <p className="eyebrow">Expertise</p>
          <h2 id="expertise" className="h2 mt-2">
            두 가지 핵심 역량
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {expertise.map((e) => (
              <div key={e.title} className="card">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Icon name={e.icon} size={20} />
                </span>
                <h3 className="mt-5 text-xl font-bold tracking-tight">{e.title}</h3>
                <p className="mt-2 text-[15px] text-muted">{e.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-y border-border bg-surface" aria-labelledby="solutions">
        <div className="container-content">
          <p className="eyebrow">Solutions</p>
          <h2 id="solutions" className="h2 mt-2">
            이런 문제를 해결합니다
          </h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((s) => (
              <li key={s.title} className="rounded-card border border-border bg-background p-6">
                <Icon name={s.icon} size={22} className="text-accent" />
                <h3 className="mt-4 text-base font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="section" aria-labelledby="featured">
          <div className="container-content">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Featured Projects</p>
                <h2 id="featured" className="h2 mt-2">
                  대표 프로젝트
                </h2>
              </div>
              <Link href="/tools" className="hidden text-sm font-medium text-accent hover:underline sm:block">
                모든 프로젝트 보기 →
              </Link>
            </div>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((p) => (
                <li key={p.id} className="flex">
                  <div className="flex w-full">
                    <ProjectCard project={p} />
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/tools" className="mt-8 inline-block text-sm font-medium text-accent hover:underline sm:hidden">
              모든 프로젝트 보기 →
            </Link>
          </div>
        </section>
      )}

      <section className="section border-y border-border bg-surface" aria-labelledby="approach">
        <div className="container-content">
          <p className="eyebrow">Work Approach</p>
          <h2 id="approach" className="h2 mt-2">
            일하는 방식
          </h2>
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {approach.map((a) => (
              <li key={a.step} className="border-t-2 border-foreground pt-4">
                <span className="text-sm font-semibold text-accent">{a.step}</span>
                <h3 className="mt-2 text-base font-bold">{a.title}</h3>
                <p className="mt-2 text-sm text-muted">{a.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
