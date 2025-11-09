"use client";

import { useMemo, useState } from "react";
import { TemplateCard } from "@/components/TemplateCard";
import { Badge } from "@/components/ui/badge";
import { Bot } from "lucide-react";
import { Link } from "@/i18n/routing";
import { CustomRequestForm } from "@/components/custom-request-form";
import {
  TEMPLATES,
  TEMPLATE_CATEGORIES,
  getTemplatesByCategory,
  type Template,
} from "@/lib/templates";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("Hammasi");

  // Memoize filtered templates for better performance
  const filteredTemplates = useMemo(() => {
    return getTemplatesByCategory(selectedCategory);
  }, [selectedCategory]);

  // Transform templates to include icon components
  const templatesWithIcons = useMemo(() => {
    return filteredTemplates.map((template) => ({
      ...template,
      icon: <template.icon className="h-6 w-6" />,
    }));
  }, [filteredTemplates]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="border-b border-border/50 bg-gradient-to-b from-background to-muted/20 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-4 px-4 py-1.5">
              <Bot className="mr-1.5 h-3.5 w-3.5" />
              Tayyor Telegram Bot Shablonlari
            </Badge>

            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Tayyor Telegram Bot Shablonlari.{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Hoziroq boshlang
              </span>
            </h1>

            <p className="mb-8 text-lg text-muted-foreground">
              Biznesingiz uchun tayyor bot shablonlarini tanlang, sotib oling va
              bir necha soat ichida ishga tushiring
            </p>

            <div className="mx-auto max-w-md">
              <div className="relative">
                <Link
                  href={"#templates"}
                  className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-0 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                    Shablonlarni ko'rish
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Section with Filters */}
      <section id="templates" className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Category Filters */}
          <div className="mb-10 overflow-x-auto pb-2">
            <div className="flex gap-2">
              {TEMPLATE_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Templates Count */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredTemplates.length} ta shablon topildi
            </p>
          </div>

          {/* Templates Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {templatesWithIcons.map((template) => (
              <TemplateCard key={template.id} {...template} />
            ))}
          </div>
        </div>
      </section>

      {/* Custom Request Section */}
      <section className="border-t border-border/50 bg-gradient-to-b from-background to-muted/20 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
                O'zingizga mos shablon topilmadimi?
              </h2>
              <p className="text-muted-foreground">
                Biznesingiz uchun mos bot yaratishimizni xohlaysizmi?
                So'rovingizni yozib yuboring va biz sizga mos yechim taklif
                qilamiz
              </p>
            </div>
            <CustomRequestForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2 text-xl font-bold">
              <Bot className="h-6 w-6 text-primary" />
              <span>BotTemplates</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 BotTemplates. Barcha huquqlar himoyalangan.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
