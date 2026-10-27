import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const metadata = { title: "페이지를 찾을 수 없습니다 | CODIVO STUDIO", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="container-content py-24 text-center sm:py-32">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">페이지를 찾을 수 없습니다</h1>
      <p className="mt-4 text-muted">주소가 변경되었거나 존재하지 않는 페이지입니다.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className={buttonVariants()}>홈으로</Link>
        <Link href="/tools" className={buttonVariants({ variant: "outline" })}>프로젝트 보기</Link>
      </div>
    </section>
  );
}
