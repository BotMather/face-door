import { Bot, ArrowRight, EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TemplateListType } from "@/types/template";

export const TemplateCard = (template: TemplateListType) => {
  return (
    <Card className="group flex h-full flex-col overflow-hidden bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
      {/* Template Preview Area */}
      <div
        style={{ backgroundImage: `url("${template.image}")` }}
        className="bg-gradient relative flex aspect-video items-center justify-center overflow-hidden rounded-lg border-b border-border/50 bg-cover bg-center"
      >
        <span className="text-md absolute right-3 top-3 rounded-xl bg-yellow-400 p-2 font-bold text-red-700">
          - {template.discount}
          {template.discount_type === "percent" ? "%" : "UZS"}
        </span>
      </div>

      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold transition-colors group-hover:text-primary">
          {template.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        <ul className="space-y-2">
          {template.features.slice(0, 4).map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm">
              <span className="text-muted-foreground">{feature.name}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="flex flex-col">
        <div className="flex w-full items-center justify-between border-t border-border/50 pt-4">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-blue-600">
              {formatCurrency(+template.price)}
            </span>
            <span className="ml-1 text-[16px] text-muted-foreground line-through">
              {formatCurrency(+template.original_price)}
            </span>
          </div>
          <Link href={`/template/${template.id}`}>
            <Button size="sm" className="group-hover:shadow-md">
              Ko'rish
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </div>
        <div className="flex w-full items-center gap-2">
          <EyeIcon size={20} />
          {template.views}
        </div>
      </CardFooter>
    </Card>
  );
};

import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/format-currency";
import Link from "next/link";

export const TemplateCardSkeleton = () => {
  return (
    <Card className="flex h-full flex-col overflow-hidden bg-card">
      {/* Preview area */}
      <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-lg border-b border-border/50 bg-muted">
        <Skeleton className="absolute right-3 top-3 h-5 w-12 rounded-full" />
      </div>

      <CardHeader className="pb-4">
        <CardTitle>
          <Skeleton className="h-5 w-32 rounded-md" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="mt-2 h-4 w-full rounded-md" />
          <Skeleton className="mt-1 h-4 w-3/4 rounded-md" />
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        <ul className="space-y-2">
          {[...Array(4)].map((_, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <Skeleton className="h-3 w-24 rounded-md" />
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t border-border/50 pt-4">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-6 w-16 rounded-md" />
          <Skeleton className="h-3 w-10 rounded-md" />
        </div>
        <Skeleton className="h-8 w-20 rounded-lg" />
      </CardFooter>
    </Card>
  );
};
