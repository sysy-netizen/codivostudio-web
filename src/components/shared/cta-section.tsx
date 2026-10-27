import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function CtaSection({
  title = "반복되는 업무, 복잡한 데이터. 함께 해결할 방법을 찾아보세요.",
  label = "프로젝트 문의하기",
}: {
  title?: string;
  label?: string;
}) {
  return (
    <section className="section">
      <div className="container-content">
        <div className="rounded-card border border-border bg-surface px-6 py-12 text-center sm:px-12">
          <h2 className="mx-auto max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
          <Link href="/contact" className={`${buttonVariants()} mt-8`}>
            {label}
          </Link>
        </div>
      </div>
    </section>
  );
}
