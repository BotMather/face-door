"use client";

import {
  Mail,
  Phone,
  MapPin,
  Send,
  Linkedin,
  Twitter,
  MessageSquare,
} from "lucide-react";
import { useEffect, useState } from "react";
import { BlurText } from "@/components/blur-text";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } catch (error) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const [isVisible, setIsVisible] = useState(false);
  const [benefitsLoaded, setBenefitsLoaded] = useState(false);
  const [testimonialsLoaded, setTestimonialsLoaded] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const benefitsTimer = setTimeout(() => setBenefitsLoaded(true), 300);
    const testimonialsTimer = setTimeout(
      () => setTestimonialsLoaded(true),
      400,
    );

    // Enhanced scroll animations
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
    const fadeElements = document.querySelectorAll(".fade-in-section");
    const scrollElements = document.querySelectorAll(".scroll-animate");
    const scrollFadeElements = document.querySelectorAll(
      ".scroll-animate-fade",
    );
    const scrollScaleElements = document.querySelectorAll(
      ".scroll-animate-scale",
    );

    [
      ...fadeElements,
      ...scrollElements,
      ...scrollFadeElements,
      ...scrollScaleElements,
    ].forEach((el) => {
      observer.observe(el);
    });

    return () => {
      clearTimeout(benefitsTimer);
      clearTimeout(testimonialsTimer);
      [
        ...fadeElements,
        ...scrollElements,
        ...scrollFadeElements,
        ...scrollScaleElements,
      ].forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <main className="flex flex-col overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden px-4 py-20">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 right-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute -bottom-40 left-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl"></div>
        </div>

        <div className="mx-auto max-w-4xl space-y-8 text-center">
          <div className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <span className="inline-flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Biz bilan bog'laning
            </span>
          </div>

          <BlurText
            className="text-balance text-4xl font-bold leading-tight md:text-6xl"
            delay={100}
            blurAmount={8}
          >
            Sizning savollaringizga javob berish uchun{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              shunga tayyor
            </span>
          </BlurText>

          <BlurText
            className="mx-auto max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground md:text-xl"
            delay={300}
            blurAmount={6}
          >
            BotMather jamoasi har doim sizning yardamingizga tayyor. Istalgan
            savolni yozing va biz tezda javob beramiz.
          </BlurText>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="scroll-animate px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: Mail,
                title: "Email",
                description: "Savollaringizni yuboring",
                contact: "support@botmather.uz",
                color: "from-primary/20 to-primary/5",
              },
              {
                icon: Phone,
                title: "Telefon",
                description: "24/7 qo'llab-quvvatlash",
                contact: "+998 99 123 45 67",
                color: "from-accent/20 to-accent/5",
              },
              {
                icon: MapPin,
                title: "Manzil",
                description: "Bizning ofis",
                contact: "Tashkent, Uzbekistan",
                color: "from-primary/20 to-primary/5",
              },
            ].map((info, idx) => {
              const Icon = info.icon;
              return (
                <div
                  key={idx}
                  className="group"
                  style={{
                    animation: `slideInUp 0.5s ease-out forwards`,
                    animationDelay: `${idx * 0.1}s`,
                  }}
                >
                  <div
                    className={`bg-gradient-to-br ${info.color} relative space-y-4 overflow-hidden rounded-2xl border border-border/60 p-8 transition-all duration-300 hover:-translate-y-3 hover:transform hover:border-primary/80 hover:shadow-xl hover:shadow-primary/15 group-hover:scale-105`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                    <div className="relative inline-block">
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-accent opacity-0 blur-xl transition-all duration-300 group-hover:scale-110 group-hover:opacity-40"></div>
                      <div className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-primary/30 bg-gradient-to-br from-primary/30 to-accent/20 transition-all duration-300 group-hover:scale-125 group-hover:border-primary/60">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                    </div>

                    <div className="relative space-y-2">
                      <h3 className="text-xl font-bold transition-colors group-hover:text-primary">
                        {info.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {info.description}
                      </p>
                      <p className="font-semibold text-foreground">
                        {info.contact}
                      </p>
                    </div>

                    <div className="absolute right-0 top-0 h-32 w-32 -translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-to-br from-accent/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="scroll-animate bg-muted/20 px-4 py-20">
        <div className="mx-auto max-w-2xl">
          <div className="mb-12 space-y-4 text-center">
            <BlurText className="text-4xl font-bold md:text-5xl" delay={200}>
              Xabar yuboring
            </BlurText>
            <BlurText className="text-lg text-muted-foreground" delay={400}>
              Quyidagi formani to'ldiring va biz tezda javob beramiz
            </BlurText>
          </div>

          <div className="group relative">
            {/* Glowing border effect */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary via-accent to-primary opacity-0 blur transition-opacity duration-500 group-hover:opacity-30"></div>

            {/* Form Container */}
            <div className="relative space-y-6 overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-2xl transition-all duration-500 hover:border-primary/50 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-semibold text-foreground"
                    >
                      Ismingiz *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Ismingizni kiriting"
                      className="w-full rounded-lg border border-border bg-muted/30 px-4 py-3 text-foreground placeholder-muted-foreground transition-all focus:border-primary focus:bg-card focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-semibold text-foreground"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="sizning@email.uz"
                      className="w-full rounded-lg border border-border bg-muted/30 px-4 py-3 text-foreground placeholder-muted-foreground transition-all focus:border-primary focus:bg-card focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Subject Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-sm font-semibold text-foreground"
                  >
                    Mavzu *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Xabari mavzusu"
                    className="w-full rounded-lg border border-border bg-muted/30 px-4 py-3 text-foreground placeholder-muted-foreground transition-all focus:border-primary focus:bg-card focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-semibold text-foreground"
                  >
                    Xabar *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Batafsil xabar yuboring..."
                    rows={6}
                    className="w-full resize-none rounded-lg border border-border bg-muted/30 px-4 py-3 text-foreground placeholder-muted-foreground transition-all focus:border-primary focus:bg-card focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex flex-col gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/40 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? "Jo'natilmoqda..." : "Xabar jo'natish"}
                    <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </button>

                  {/* Status Messages */}
                  {submitStatus === "success" && (
                    <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400">
                      ✓ Xabar muvaffaqiyatli jo'natildi! Tez orada javob
                      beramiz.
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
                      ✗ Xato yuz berdi. Qayta urinib ko'ring.
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Social Links Section */}
      <section className="scroll-animate px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 space-y-4 text-center">
            <BlurText className="text-4xl font-bold md:text-5xl" delay={200}>
              Bizni kuzatib turing
            </BlurText>
            <BlurText className="text-lg text-muted-foreground" delay={400}>
              Ijtimoiy tarmoqlarimizda so'nggi yangilanishlarni bilib oling
            </BlurText>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: Linkedin,
                title: "LinkedIn",
                description: "Kasbiy yangilanishlarni kuzatib turing",
                link: "https://linkedin.com",
                color: "from-blue-500/20 to-blue-500/5",
              },
              {
                icon: Twitter,
                title: "Twitter",
                description: "Eng so'ngi xabarlarni bilib oling",
                link: "https://twitter.com",
                color: "from-sky-500/20 to-sky-500/5",
              },
              {
                icon: MessageSquare,
                title: "Telegram",
                description: "Biz bilan bevosita bog'lanish",
                link: "https://telegram.me",
                color: "from-cyan-500/20 to-cyan-500/5",
              },
            ].map((social, idx) => {
              const Icon = social.icon;
              return (
                <a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  style={{
                    animation: `slideInUp 0.5s ease-out forwards`,
                    animationDelay: `${idx * 0.1}s`,
                  }}
                >
                  <div
                    className={`bg-gradient-to-br ${social.color} relative space-y-3 overflow-hidden rounded-2xl border border-border/60 p-8 text-center transition-all duration-300 hover:-translate-y-3 hover:transform hover:border-primary/80 hover:shadow-xl hover:shadow-primary/15 group-hover:scale-105`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                    <div className="relative inline-block">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl border border-primary/30 bg-gradient-to-br from-primary/30 to-accent/20 transition-all duration-300 group-hover:scale-125 group-hover:border-primary/60">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                    </div>

                    <div className="relative space-y-1">
                      <h3 className="text-lg font-bold transition-colors group-hover:text-primary">
                        {social.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {social.description}
                      </p>
                    </div>

                    <div className="absolute right-0 top-0 h-32 w-32 -translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-to-br from-accent/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="scroll-animate bg-muted/20 px-4 py-20">
        <div className="mx-auto max-w-2xl">
          <div className="mb-12 space-y-4 text-center">
            <BlurText className="text-4xl font-bold md:text-5xl" delay={200}>
              Tez-tez so'raladigan savollar
            </BlurText>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "Javob berish vaqti qancha?",
                answer:
                  "Bizim jamoasi iş kunlari 24 soat ichida javob beradi. Shaxar vaqti 09:00 dan 18:00 gacha.",
              },
              {
                question: "Qaysi kanallar orqali qo'llab-quvvatlash olaman?",
                answer:
                  "Siz email, telefon, Telegram, chat va LinkedIn orqali bizga murojaat qilishingiz mumkin.",
              },
              {
                question: "Birinchi savolingiz uchun to'lov kerakmi?",
                answer:
                  "Yo'q, barcha boshlang'ich savollar bepul. Faqat qo'shimcha xizmati uchun to'lash kerak bo'ladi.",
              },
              {
                question: "Sabotaj yoki texnik muammoni qanday hal qilasiz?",
                answer:
                  "Premium foydalanuvchilarga prioritet qo'llab-quvvatlash beriladi. Texnik muammo mavjud bo'lsa, darhol hal qilinadi.",
              },
            ].map((faq, idx) => (
              <details
                key={idx}
                className="group rounded-lg border border-border/60 bg-gradient-to-br from-card to-card/90 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
              >
                <summary className="flex cursor-pointer items-center justify-between p-6 font-semibold text-foreground transition-colors hover:text-primary">
                  <span>{faq.question}</span>
                  <span className="transition-transform group-open:rotate-180">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="border-t border-border/40 px-6 py-4 text-muted-foreground">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
