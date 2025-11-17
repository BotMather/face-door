"use client";

import { PhoneInput } from "@/components/phone-input";
import { TemplateCard } from "@/components/TemplateCard";

export function RelatedTemplates() {
  return (
    <section className="mx-auto max-w-7xl border-t border-border/50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground">
          Related Templates
        </h2>
        <a
          href="#"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          See All →
        </a>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* TODO */}
        {/* {TEMPLATES.map((template) => (
          <TemplateCard key={template.id} {...template}></TemplateCard>
        ))} */}
      </div>

      <div className="items-centermt-12 flex flex-col justify-center rounded-lg bg-gradient-to-br from-accent/20 via-primary/10 to-accent/10 p-12 text-center">
        <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
          Sizga kerakli telegram bot topilmayaptimi?
        </h2>
        <PhoneInput
          defaultCountry="UZ"
          className="mx-auto w-[300px]"
        ></PhoneInput>
        <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
          Discover more templates from this creator
        </p>
        <button className="rounded-full bg-foreground px-8 py-3 font-semibold text-background transition-opacity hover:opacity-90">
          View Creator
        </button>
      </div>
    </section>
  );
}
