import { Bot, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/routing";

interface TemplateCardProps {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  icon: React.ReactNode;
  category: string;
}

export const TemplateCard = ({
  id,
  title,
  description,
  price,
  features,
  icon,
  category,
}: TemplateCardProps) => {
  const templateId = id;
  return (
    <Card className="group flex h-full flex-col overflow-hidden bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
      {/* Template Preview Area */}
      <div className="relative flex aspect-video items-center justify-center overflow-hidden border-b border-border/50 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20" />
        <div className="relative rounded-xl bg-primary/20 p-4 text-primary backdrop-blur-sm">
          {icon}
        </div>
        <Badge
          variant="secondary"
          className="absolute right-3 top-3 text-xs font-medium"
        >
          {category}
        </Badge>
      </div>

      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold transition-colors group-hover:text-primary">
          {title}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-sm">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        <ul className="space-y-2">
          {features.slice(0, 4).map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm">
              <Bot className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary/60" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t border-border/50 pt-4">
        <div>
          <span className="text-2xl font-bold">{price}</span>
          <span className="ml-1 text-xs text-muted-foreground">bir marta</span>
        </div>
        <Link href={`/template/${templateId}`}>
          <Button size="sm" className="group-hover:shadow-md">
            Ko'rish
            <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
