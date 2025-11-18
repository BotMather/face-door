"use client";

import { useState, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";
import { TemplateCardSkeleton } from "@/components/TemplateCard";
import { BlurText } from "@/components/blur-text";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useReactQueryAction } from "@/services/use-react-query-action";
import { APIListResponse } from "@/types/http";
import { Category, Feature, TemplateListType } from "@/types/template";
import { Skeleton } from "@/components/ui/skeleton";
import TemplateCardV2 from "@/components/TemplateCardV2";

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category[] | []>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<Feature[] | []>([]);

  const { data: templates } = useReactQueryAction<
    APIListResponse<TemplateListType[]>
  >({
    url: "/api/template",
    debounceTime: 400,
    query: {
      search: searchQuery,
      features: selectedFeatures.map((item) => item.id),
      categories: selectedCategory.map((item) => item.id),
    },
  });

  const { data: category } = useReactQueryAction<APIListResponse<Category[]>>({
    url: "/api/category",
  });

  const { data: feature } = useReactQueryAction<APIListResponse<Category[]>>({
    url: "/api/feature",
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // Enhanced scroll animationsz
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          entry.target.classList.add("animate-visible");
        }
      });
    }, observerOptions);

    // Observe all animation elements
    const scrollElements = document.querySelectorAll(".scroll-animate");
    scrollElements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      scrollElements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, [templates]);

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-primary/5 via-background to-background px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 space-y-6 text-center">
            <BlurText
              className={`text-4xl font-bold md:text-6xl ${
                isVisible ? "translate-y-0" : "translate-y-4"
              }`}
              delay={100}
              blurAmount={8}
            >
              Telegram bot{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                shablonlari
              </span>
            </BlurText>
            <BlurText
              className={`mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl ${
                isVisible ? "translate-y-0" : "translate-y-4"
              }`}
              delay={300}
              blurAmount={6}
            >
              20K+ tayyorlangan shablonlar. Biznesingiz uchun to'g'ri botni
              toping va 5 daqiqada ishga tushiring.
            </BlurText>
          </div>

          {/* Search Bar */}
          <div
            className={`mx-auto max-w-2xl transition-all delay-300 duration-700 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Shablonlarni qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 rounded-full border-border/50 bg-background/50 pl-12 pr-4 text-base backdrop-blur-sm transition-all hover:border-primary/50 focus:border-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Templates */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-7xl">
          {/* Category Filters */}
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>Kategoriya:</span>
            </div>

            <Button
              variant={!selectedCategory ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory([])}
              className={`rounded-full transition-all ${
                !selectedCategory
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "hover:border-primary/50"
              }`}
            >
              <X />
              Tozalash
            </Button>

            {category ? (
              category.data.results.map(({ id, name }) => {
                const isSelected = selectedCategory.some(
                  (cat) => cat.id === id,
                );
                return (
                  <Button
                    key={`category-${id}`}
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      if (isSelected) {
                        setSelectedCategory(
                          selectedCategory.filter((cat) => cat.id !== id),
                        );
                      } else {
                        setSelectedCategory([
                          ...selectedCategory,
                          { id, name },
                        ]);
                      }
                    }}
                    className={`rounded-full transition-all ${
                      isSelected
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                        : "hover:border-primary/50"
                    }`}
                  >
                    {name}
                  </Button>
                );
              })
            ) : (
              <>
                <CategoryButtonSkeleton />
                <CategoryButtonSkeleton />
                <CategoryButtonSkeleton />
                <CategoryButtonSkeleton />
                <CategoryButtonSkeleton />
              </>
            )}
          </div>

          {/* Feature */}
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>Feature:</span>
            </div>

            <Button
              variant={!selectedFeatures ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory([])}
              className={`rounded-full transition-all ${
                !selectedFeatures
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "hover:border-primary/50"
              }`}
            >
              <X />
              Tozalash
            </Button>

            {feature ? (
              feature.data.results.map(({ id, name }) => {
                const isSelected = selectedFeatures.some(
                  (cat) => cat.id === id,
                );
                return (
                  <Button
                    key={`category-${id}`}
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      if (isSelected) {
                        setSelectedFeatures(
                          selectedFeatures.filter((cat) => cat.id !== id),
                        );
                      } else {
                        setSelectedFeatures([
                          ...selectedFeatures,
                          { id, name },
                        ]);
                      }
                    }}
                    className={`rounded-full transition-all ${
                      isSelected
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                        : "hover:border-primary/50"
                    }`}
                  >
                    {name}
                  </Button>
                );
              })
            ) : (
              <>
                <CategoryButtonSkeleton />
                <CategoryButtonSkeleton />
                <CategoryButtonSkeleton />
                <CategoryButtonSkeleton />
                <CategoryButtonSkeleton />
              </>
            )}
          </div>

          {/* Templates Grid */}
          {templates ? (
            templates.data.results.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {templates.data.results.map((template) => {
                  return (
                    <div
                      key={template.id}
                      className="scroll-animate"
                      style={{
                        animation: `slideInUp 0.5s ease-out forwards`,
                      }}
                    >
                      <TemplateCardV2 {...template} />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-border/50 bg-muted/20 p-12 text-center">
                <Search className="mb-4 h-12 w-12 text-muted-foreground/50" />
                <h3 className="mb-2 text-xl font-semibold">
                  Shablon topilmadi
                </h3>
                <p className="max-w-md text-sm text-muted-foreground">
                  Qidiruv so'rovingizga mos shablon topilmadi. Boshqa kategoriya
                  yoki qidiruv so'zini sinab ko'ring.
                </p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory([]);
                    setSelectedFeatures([]);
                  }}
                >
                  Filtrlarni tozalash
                </Button>
              </div>
            )
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <TemplateCardSkeleton />
              <TemplateCardSkeleton />
              <TemplateCardSkeleton />
              <TemplateCardSkeleton />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function CategoryButtonSkeleton() {
  return <Skeleton className="h-8 w-24 rounded-full" />;
}
