import { Check } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmailActions } from "@/components/contact/email-actions";
import { contactScopes } from "@/data/services";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "프로젝트 문의 | CODIVO STUDIO",
  description: "자동차 데이터 분석, 데이터 처리, Python 업무 자동화, 맞춤형 프로그램 개발 협업 문의.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="CONTACT"
        title="Have a project in mind?"
        description="자동차 데이터 분석, 데이터 처리, Python 업무 자동화, 맞춤형 프로그램 및 웹 도구 개발 협업을 환영합니다."
      />
      <section className="section">
        <div className="container-content grid gap-10 text-center lg:grid-cols-2">
          <div className="card">
            <h2 className="text-sm font-semibold text-accent">이메일로 문의하기</h2>
            <div className="mt-5">
              <EmailActions email={site.email} />
            </div>
            <p className="mt-4 text-sm text-muted">
              문의 내용에 업무 상황, 사용 중인 데이터 형식(Excel/CSV 등), 희망 일정을 함께 적어 주시면 검토가 빠릅니다.
              비공개 데이터는 첨부하지 말아 주세요.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold">문의 범위</h2>
            <ul className="mt-4 space-y-3 [&>li]:justify-center">
              {contactScopes.map((s) => (
                <li key={s} className="flex items-center gap-3 text-[15px]">
                  <Check size={16} className="text-accent" aria-hidden="true" /> {s}
                </li>
              ))}
            </ul>
            {site.profileLinks.length > 0 && (
              <ul className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
                {site.profileLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
