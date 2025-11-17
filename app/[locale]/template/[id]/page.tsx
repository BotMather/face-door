"use client";

import { HeroSection } from "./sections/hero-section";
import { TemplateStats } from "./sections/template-stats";
import { AboutSection } from "./sections/about-section";
import { RelatedTemplates } from "./sections/related-templates";
import { Footer } from "./sections/footer";
import { useReactQueryAction } from "@/services/use-react-query-action";
import { APIDetailCreateResponse } from "@/types/http";
import { TemplateDetailType } from "@/types/template";

export default function Page() {
  const { data } = useReactQueryAction<
    APIDetailCreateResponse<TemplateDetailType>
  >({
    url: "/api/template/[id]",
  });

  console.log(
    "🔍 ~ Page ~ app/[locale]/template/[id]/page.tsx:9 ~ data:",
    data,
  );

  if (data)
    return (
      <main className="min-h-screen bg-background">
        <div className="border-b border-border/50" />
        <HeroSection data={data.data} />
        <TemplateStats />
        <AboutSection />
        <RelatedTemplates />
        <Footer />
      </main>
    );
}
