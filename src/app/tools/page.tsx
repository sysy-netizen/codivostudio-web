import { PageHeader } from "@/components/shared/page-header";
import { CtaSection } from "@/components/shared/cta-section";
import { ToolsExplorer } from "@/components/tools/tools-explorer";
import { getPublishedProjects } from "@/lib/projects";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "개발 도구 및 프로젝트 | CODIVO STUDIO",
  description: "직접 사용할 수 있는 공개 도구와 데이터 분석·업무 자동화 개발 프로젝트 사례를 확인하세요.",
  path: "/tools",
});

export default function ToolsPage() {
  return (
    <>
      <PageHeader
        eyebrow="TOOLS"
        title="실제로 작동하는 결과물"
        description="직접 사용할 수 있는 공개 도구와, 개발 과정·기술·해결한 문제를 설명하는 프로젝트 사례를 모았습니다."
      />
      <section className="section">
        <div className="container-content">
          <ToolsExplorer projects={getPublishedProjects()} />
        </div>
      </section>
      <CtaSection title="필요한 도구가 있다면 함께 만들어 보세요." />
    </>
  );
}
