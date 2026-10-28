import Image from "next/image";
import Link from "next/link";
import { Info } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { automotiveExpertise, dataNotice, philosophy, profile } from "@/data/profile";
import { skillLevelLabels, skills, type SkillLevel } from "@/data/skills";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/data/site";

export const metadata = buildMetadata({
  title: "소개 | CODIVO STUDIO",
  description:
    "자동차 데이터 분석과 Python 개발을 결합해 실무 문제를 해결하는 CODIVO STUDIO와 Kasey의 전문 영역을 소개합니다.",
  path: "/about",
});

const levelOrder: SkillLevel[] = ["practice", "project", "learning"];

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="ABOUT" title="복잡한 실무를 더 단순하게 만드는 기술 스튜디오" description={profile.intro} />

      <section className="container-content pt-10 sm:pt-14" aria-label="브랜드 의미">
        <div className="mx-auto max-w-4xl rounded-card border-l-4 border-accent bg-accent-soft p-5 sm:p-6">
          <p className="font-semibold text-accent">브랜드 의미</p>
          <p className="mt-2 text-[15px] leading-7 sm:text-base">
            CODIVO는 <strong className="font-semibold">Code + Vivo</strong>의 합성어로,{" "}
            <span className="whitespace-nowrap">{site.brandMeaning.detail}</span>
          </p>
        </div>
      </section>

      <section className="section" aria-label="프로필과 작업 철학">
        <div className="container-content text-center">
          <div className="card mx-auto max-w-4xl p-8 sm:p-12">
            {profile.photo && (
              <Image src={profile.photo} alt={`${profile.name} 프로필 사진`} width={120} height={120} className="mx-auto mb-6 h-28 w-28 rounded-xl object-cover" />
            )}
            <p className="text-3xl font-bold tracking-tight sm:text-4xl">Hi, I&apos;m {profile.name}.</p>
            <p className="mt-2 text-muted sm:text-lg">{profile.role}</p>
            <ul className="mt-5 flex flex-wrap justify-center gap-2">
              {profile.areas.map((a) => (
                <li key={a}><Badge variant="accent">{a}</Badge></li>
              ))}
            </ul>

            <div className="mt-10 border-t border-border pt-8">
              <p className="eyebrow">Philosophy</p>
              <h2 className="h2 mt-2">작업 철학</h2>
              <ul className="mt-8 grid gap-5 md:grid-cols-3">
                {philosophy.map((p) => (
                  <li key={p.title} className="border-t-2 border-foreground pt-4">
                    <h3 className="text-lg font-bold">{p.title}</h3>
                    <p className="mt-2 text-[15px] text-muted">{p.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {profile.history.length > 0 && (
            <ol className="mx-auto mt-6 max-w-4xl space-y-4">
              {profile.history.map((h) => (
                <li key={h.period + h.title} className="card">
                  <p className="text-sm text-muted">{h.period}</p>
                  <p className="font-semibold">{h.title}</p>
                  {h.description && <p className="mt-1 text-sm text-muted">{h.description}</p>}
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>

      <section className="section border-y border-border bg-surface" aria-labelledby="auto">
        <div className="container-content text-center">
          <p className="eyebrow">Automotive Data</p>
          <h2 id="auto" className="h2 mt-2">자동차 데이터 전문 분야</h2>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {automotiveExpertise.map((item, i) => (
              <li key={item} className="rounded-card border border-border bg-background p-5">
                <span className="text-sm font-semibold text-accent">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-2 font-medium">{item}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 flex justify-center gap-2 text-left text-sm text-muted">
            <Info size={16} className="mt-1 shrink-0" aria-hidden="true" />
            {dataNotice}
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="dev">
        <div className="container-content text-center">
          <p className="eyebrow">Software Development</p>
          <h2 id="dev" className="h2 mt-2">소프트웨어 개발 전문 분야</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Python, pandas, Excel/CSV, REST API, JSON, 업무 자동화, AI 코딩 도구를 활용한 개발, Next.js 기반 웹 도구 제작.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {levelOrder.map((lv) => {
              const items = skills.filter((s) => s.level === lv);
              if (!items.length) return null;
              return (
                <div key={lv} className="card">
                  <h3 className="text-sm font-semibold text-accent">{skillLevelLabels[lv]}</h3>
                  <ul className="mt-4 space-y-2">
                    {items.map((s) => (
                      <li key={s.name} className="text-[15px]">{s.name}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section border-t border-border bg-surface">
        <div className="container-content flex flex-wrap justify-center gap-3">
          <Link href="/tools" className={buttonVariants()}>프로젝트 보기</Link>
          <Link href="/contact" className={buttonVariants({ variant: "outline" })}>프로젝트 문의</Link>
        </div>
      </section>
    </>
  );
}
