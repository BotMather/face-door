"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/phone-input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Clock, Phone, CheckCircle2, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/routing";
import { getTemplateById } from "@/lib/templates";
import { validateAndNormalizePhone } from "@/lib/phone-validation";

export default function TemplateDetailPage() {
  const params = useParams();
  const templateId = params.id as string;

  const template = useMemo(() => getTemplateById(templateId), [templateId]);

  const [phoneNumber, setPhoneNumber] = useState("+998");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate phone number using utility function
    const phoneValidation = validateAndNormalizePhone(phoneNumber);
    if (!phoneValidation.isValid) {
      setError(phoneValidation.error || "Noto'g'ri telefon raqami");
      return;
    }

    if (!template) {
      setError("Shablon topilmadi");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/template/phone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          templateId: template.id,
          templateTitle: template.title,
          phoneNumber: phoneValidation.normalized,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Telefon raqamini saqlashda xatolik yuz berdi",
        );
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show not found if template doesn't exist
  if (!template) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold">Shablon topilmadi</h1>
        <Link href="/">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Bosh sahifaga qaytish
          </Button>
        </Link>
      </div>
    );
  }

  const IconComponent = template.icon;

  // Success state
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-16">
          <Card className="mx-auto max-w-2xl">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl">
                Muvaffaqiyatli ro'yxatdan o'tdingiz!
              </CardTitle>
              <CardDescription className="mt-4 text-base">
                Telefon raqamingiz qabul qilindi. Sizga SMS orqali bot ishga
                tushgan haqida xabar yuboramiz.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg bg-muted p-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Bot ishga tushish vaqti</p>
                    <p className="text-sm text-muted-foreground">
                      Botingiz 24 soatdan keyin ishga tushadi
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">SMS xabarnoma</p>
                    <p className="text-sm text-muted-foreground">
                      Bot tayyor bo'lganda sizga SMS yuboramiz
                    </p>
                  </div>
                </div>
              </div>
              <Link href="/">
                <Button className="w-full" size="lg">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Bosh sahifaga qaytish
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Main form view
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Orqaga
          </Button>
        </Link>

        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Phone Form */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Bot ishga tushish
                  </CardTitle>
                  <CardDescription>
                    Botingiz 24 soatdan keyin ishga tushadi. Telefon
                    raqamingizni qoldiring va biz sizga SMS orqali xabar
                    yuboramiz.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="phone"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Telefon raqami
                      </label>
                      <PhoneInput
                        id="phone"
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                        error={error}
                        disabled={isSubmitting}
                        required
                        aria-invalid={!!error}
                        aria-describedby={error ? "phone-error" : undefined}
                      />
                      {error && (
                        <p
                          id="phone-error"
                          className="text-sm text-destructive"
                          role="alert"
                        >
                          {error}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Faqat raqamlarni kiriting (masalan: 90 123 45 67)
                      </p>
                    </div>

                    <div className="rounded-lg bg-muted p-3">
                      <p className="text-xs text-muted-foreground">
                        <Phone className="mr-1 inline h-3 w-3" />
                        Bot tayyor bo'lganda sizga SMS yuboramiz
                      </p>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={isSubmitting || !phoneNumber.trim()}
                      isLoading={isSubmitting}
                    >
                      {isSubmitting
                        ? "Saqlanmoqda..."
                        : "Telefon raqamini qoldirish"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Template Info */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-3 text-primary">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl">
                        {template.title}
                      </CardTitle>
                      <Badge variant="secondary" className="mt-2">
                        {template.category}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold">{template.price}</p>
                      <p className="text-xs text-muted-foreground">bir marta</p>
                    </div>
                  </div>
                  <CardDescription className="text-base">
                    {template.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Xususiyatlar:</h3>
                    <ul className="space-y-2">
                      {template.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Bot className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                          <span className="text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
