"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PhoneInput } from "@/components/phone-input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageSquare, Send, CheckCircle2, Loader2 } from "lucide-react";
import { validateAndNormalizePhone } from "@/lib/phone-validation";

export function CustomRequestForm() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+998");
  const [request, setRequest] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate name
    if (!name.trim()) {
      setError("Ismingizni kiriting");
      return;
    }

    // Validate phone number
    const phoneValidation = validateAndNormalizePhone(phoneNumber);
    if (!phoneValidation.isValid) {
      setError(phoneValidation.error || "Noto'g'ri telefon raqami");
      return;
    }

    // Validate request
    if (!request.trim()) {
      setError("So'rovingizni yozing");
      return;
    }

    if (request.trim().length < 10) {
      setError("So'rov kamida 10 ta belgidan iborat bo'lishi kerak");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/custom-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          phoneNumber: phoneValidation.normalized,
          request: request.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "So'rovni yuborishda xatolik yuz berdi");
      }

      setIsSubmitted(true);
      // Reset form
      setName("");
      setPhoneNumber("+998");
      setRequest("");
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

  if (isSubmitted) {
    return (
      <Card className="border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/20">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
            <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-2xl text-green-900 dark:text-green-100">
            So'rovingiz qabul qilindi!
          </CardTitle>
          <CardDescription className="text-base">
            Tez orada siz bilan bog'lanamiz va sizga mos bot yaratamiz
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          O'zingizga mos shablon topilmadimi?
        </CardTitle>
        <CardDescription>
          Biznesingiz uchun mos bot yaratishimizni xohlaysizmi? So'rovingizni
          yozib yuboring va biz sizga mos yechim taklif qilamiz
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium leading-none">
              Ismingiz
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Ismingizni kiriting"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium leading-none">
              Telefon raqami
            </label>
            <PhoneInput
              id="phone"
              value={phoneNumber}
              onChange={setPhoneNumber}
              error={error && error.includes("telefon") ? error : undefined}
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="request"
              className="text-sm font-medium leading-none"
            >
              So'rovingiz
            </label>
            <Textarea
              id="request"
              placeholder="Qanday bot kerak? Biznesingiz haqida batafsil yozing..."
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              required
              disabled={isSubmitting}
              rows={5}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Kamida 10 ta belgi kiriting
            </p>
          </div>

          {error && !error.includes("telefon") && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isSubmitting || !name.trim() || !request.trim()}
            isLoading={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Yuborilmoqda...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                So'rov yuborish
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
