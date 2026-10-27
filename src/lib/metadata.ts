import type { Metadata } from "next";
import { site } from "@/data/site";

export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${site.url}${path === "/" ? "" : path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: "ko_KR",
      type: "website",
    },
    twitter: { card: "summary", title, description },
  };
}
