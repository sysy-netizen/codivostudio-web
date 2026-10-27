import Link from "next/link";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-content flex flex-col items-center gap-8 py-12 text-center">
        <div>
          <p className="text-[15px] font-bold tracking-[0.06em]">{site.name}</p>
          <p className="mt-2 text-sm text-muted">{site.taglineEn}</p>
        </div>
        <nav aria-label="푸터 메뉴">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="text-sm">
          <p className="text-muted">문의</p>
          <a href={`mailto:${site.email}`} className="font-medium hover:text-accent">
            {site.email}
          </a>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="container-content py-5 text-center text-xs text-muted">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
