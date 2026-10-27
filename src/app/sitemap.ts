import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { getPublishedProjects } from "@/lib/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/tools", "/contact"].map((p) => ({ url: `${site.url}${p}` }));
  const details = getPublishedProjects().map((p) => ({
    url: `${site.url}/tools/${p.slug}`,
    ...(p.publishedAt ? { lastModified: p.publishedAt } : {}),
  }));
  return [...pages, ...details];
}
