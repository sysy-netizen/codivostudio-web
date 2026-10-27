"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink, Mail } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

export function EmailActions({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
    setTimeout(() => setState("idle"), 2000);
  }

  return (
    <div>
      <p className="select-all break-all text-xl font-semibold sm:text-2xl">{email}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <a href={`mailto:${email}?subject=${encodeURIComponent("[CODIVO STUDIO] 프로젝트 문의")}`} className={buttonVariants()}>
          <Mail size={16} aria-hidden="true" /> 메일로 문의하기
        </a>
        <a
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent("[CODIVO STUDIO] 프로젝트 문의")}`}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: "outline" })}
        >
          <ExternalLink size={16} aria-hidden="true" /> Gmail로 열기
        </a>
        <Button variant="outline" onClick={copy}>
          {state === "copied" ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
          {state === "copied" ? "복사됨" : "이메일 복사"}
        </Button>
      </div>
      <p className="mt-3 text-sm text-muted" role="status" aria-live="polite">
        {state === "failed" ? "복사에 실패했습니다. 주소를 직접 선택해 복사해 주세요." : " "}
      </p>
    </div>
  );
}
