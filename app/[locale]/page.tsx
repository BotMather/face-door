"use client";

import Link from "next/link";
import {
  ArrowRight,
  Zap,
  Shield,
  DollarSign,
  Code2,
  Smartphone,
  Sparkles,
  Star,
  Users,
  MessageCircle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import secondScreenshot from "@/public/251111_23h51m34s_screenshot.png";
import { CountingNumber } from "@/components/counting-number";
import { BlurText } from "@/components/blur-text";

function CardSkeleton() {
  return (
    <div className="animate-pulse space-y-4 rounded-xl border border-border bg-card p-8">
      <div className="h-12 w-12 rounded-lg bg-muted blur-sm"></div>
      <div className="space-y-3">
        <div className="h-6 w-3/4 rounded-lg bg-muted blur-sm"></div>
        <div className="h-4 w-full rounded-lg bg-muted blur-sm"></div>
        <div className="h-4 w-5/6 rounded-lg bg-muted blur-sm"></div>
      </div>
    </div>
  );
}

function TestimonialSkeleton() {
  return (
    <div className="animate-pulse space-y-4 rounded-xl border border-border bg-card p-8">
      <div className="flex gap-1">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="h-4 w-4 rounded bg-muted blur-sm"></div>
          ))}
      </div>
      <div className="space-y-3">
        <div className="h-4 w-full rounded-lg bg-muted blur-sm"></div>
        <div className="h-4 w-5/6 rounded-lg bg-muted blur-sm"></div>
      </div>
      <div className="space-y-2 pt-2">
        <div className="h-4 w-1/2 rounded-lg bg-muted blur-sm"></div>
        <div className="h-3 w-1/3 rounded-lg bg-muted blur-sm"></div>
      </div>
    </div>
  );
}

export default function Home() {
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
      {/* Hero Section with Strong Headline */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20">
        {/* Background Video and Images */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {/* Video Background */}
          <video
            src="https://framerusercontent.com/assets/V81XLButChh9sPk8EvpsCqY5A.mp4"
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              zIndex: 1,
            }}
          />

          {/* Overlay gradient for better text readability */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/60"
            style={{ zIndex: 2 }}
          />
        </div>

        <div className="mx-auto max-w-4xl space-y-8 text-center">
          {/* Badge */}
          <div
            className={`inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all duration-700 ${
              isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Kod yozmasdan yarating
            </span>
          </div>

          <BlurText
            className={`text-balance text-3xl font-bold leading-tight md:text-7xl ${
              isVisible ? "translate-y-0" : "translate-y-4"
            }`}
            delay={100}
            blurAmount={8}
          >
            Biznesingizni telegram bilan{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              tizimlashtirish deyarli tekin
            </span>
          </BlurText>

          <BlurText
            className={`mx-auto max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground md:text-xl ${
              isVisible ? "translate-y-0" : "translate-y-4"
            }`}
            delay={300}
            blurAmount={6}
          >
            BotMather bilan kod yozmasdan Telegram botlarini yarating.
            Tayyorlangan shablonlardan foydalanib 5 daqiqada ishga tushiring.
            Faqat ishlatgan resurslarga to'lag'ini qiling — eng adolatli narx
            modeli.
          </BlurText>

          <div
            className={`flex flex-col justify-center gap-4 pt-8 transition-all delay-300 duration-700 sm:flex-row ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <Link
              href="/template"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/40 active:scale-95"
            >
              Hozir boshlash
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-primary/50 bg-primary/5 px-8 py-4 font-semibold text-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/10 active:scale-95"
            >
              <MessageCircle className="h-5 w-5" />
              Menga yordam kerak
            </Link>
          </div>

          <div
            className={`delay-400 grid grid-cols-3 gap-6 pt-16 text-sm transition-all duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="group cursor-default space-y-2 transition-all duration-300 hover:scale-110 hover:transform">
              <div className="flex items-center justify-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <CountingNumber
                  value={5000}
                  suffix="+"
                  duration={2000}
                  className="text-3xl font-bold text-primary md:text-4xl"
                />
              </div>
              <BlurText
                className="text-muted-foreground transition-colors group-hover:text-foreground"
                delay={500}
              >
                Faol foydalanuvchi
              </BlurText>
            </div>
            <div className="group cursor-default space-y-2 transition-all duration-300 hover:scale-110 hover:transform">
              <div className="flex items-center justify-center gap-2">
                <Smartphone className="h-5 w-5 text-accent" />
                <CountingNumber
                  value={15000}
                  suffix="+"
                  duration={2000}
                  className="text-3xl font-bold text-accent md:text-4xl"
                />
              </div>
              <BlurText
                className="text-muted-foreground transition-colors group-hover:text-foreground"
                delay={600}
              >
                Yaratilgan bot
              </BlurText>
            </div>
            <div className="group cursor-default space-y-2 transition-all duration-300 hover:scale-110 hover:transform">
              <div className="flex items-center justify-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                <CountingNumber
                  value={1000000}
                  suffix="+"
                  duration={2000}
                  className="text-3xl font-bold text-primary md:text-4xl"
                />
              </div>
              <BlurText
                className="text-muted-foreground transition-colors group-hover:text-foreground"
                delay={700}
              >
                Xabarlar
              </BlurText>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Dashboard Showcase */}
      <section className="scroll-animate bg-gradient-to-b from-transparent via-primary/5 to-transparent px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 space-y-4 text-center">
            <BlurText className="text-4xl font-bold md:text-5xl" delay={200}>
              Kuchli platform
            </BlurText>
            <BlurText className="text-lg text-muted-foreground" delay={400}>
              Barcha bot metrikalari, analitika va managing bir joyda
            </BlurText>
          </div>

          <div className="group relative">
            {/* Glowing border effect */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary via-accent to-primary opacity-0 blur transition-opacity duration-500 group-hover:opacity-30"></div>

            {/* Dashboard image */}
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20">
              <Image
                src={secondScreenshot}
                alt="BotMather platform dashboard showing analytics, metrics, and bot management interface"
                className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Overlay gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
            </div>
          </div>

          {/* Feature highlights below image */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: MessageCircle,
                title: "Real-time Analytics",
                description:
                  "Bot faoliyatini, xabarlar soni va foydalanuvchi engage'ment'ini real-timeda ko'ring",
              },
              {
                icon: Users,
                title: "User Management",
                description:
                  "Foydalanuvchilar, bloklangan kontaktlar va segmentatsiyani boshqarib turish",
              },
              {
                icon: Zap,
                title: "Performance Tracking",
                description:
                  "Bot ishlashini optimizatsiya qilish uchun detaliy reportlar va statistika",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="flex gap-4 rounded-lg border border-border/50 bg-muted/30 p-4 transition-colors hover:border-primary/30 hover:bg-muted/50"
                >
                  <div className="flex-shrink-0">
                    <Icon className="mt-1 h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="mb-1 text-sm font-semibold">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="scroll-animate-fade border-b border-border/40 bg-muted/20 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-8 text-center text-sm font-medium text-muted-foreground">
            BIZGA ISHONGAN KOMPANIYALAR
          </p>

          <div className="overflow-hidden">
            <div className="animate-scroll flex gap-16">
              {[
                "TechHub",
                "FastBiz",
                "ShopPro",
                "AutoBot",
                "TechHub",
                "FastBiz",
                "ShopPro",
                "AutoBot",
              ].map((company, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 whitespace-nowrap text-sm font-semibold text-muted-foreground opacity-60 transition-opacity hover:opacity-100"
                >
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Benefits Section - Enhanced card design with blur loading */}
      <section className="scroll-animate px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 space-y-4 text-center">
            <BlurText className="text-4xl font-bold md:text-5xl" delay={200}>
              Nega BotMather ni tanlash kerak?
            </BlurText>
            <BlurText className="text-lg text-muted-foreground" delay={400}>
              5 ta asosiy sabab — Telegram bot yaratishning eng yaxshi usuli
            </BlurText>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {benefitsLoaded ? (
              <>
                {[
                  {
                    icon: Zap,
                    title: "5 daqiqada tayyor",
                    description:
                      "Hech qanday coding knowledge siz kerak emas. Shablonni tanlang va foydalaning.",
                    color: "from-primary/20 to-primary/5",
                  },
                  {
                    icon: Shield,
                    title: "Korxona darajasi xavfsizlik",
                    description:
                      "SSL shifrlash, avtomatik zaxira va 24/7 monitoring bilan to'liq xavfsizlik.",
                    color: "from-accent/20 to-accent/5",
                  },
                  {
                    icon: DollarSign,
                    title: "Adolatli pay-per-use tarifi",
                    description:
                      "Faqat ishlatgan resurslarga to'lang. Keraksiz xarajatlar yoki hidden fees yo'q.",
                    color: "from-primary/20 to-primary/5",
                  },
                  {
                    icon: Code2,
                    title: "100+ tayyorlangan shablonlar",
                    description:
                      "E-commerce, CRM, Support bot va boshqa uchun tayyor templates mavjud.",
                    color: "from-accent/20 to-accent/5",
                  },
                  {
                    icon: Users,
                    title: "24/7 Professional support",
                    description:
                      "Murakkab masalalar uchun bizning eksperts har doim siz bilan.",
                    color: "from-primary/20 to-primary/5",
                  },
                  {
                    icon: Sparkles,
                    title: "Analytics va reporting",
                    description:
                      "Bot faoliyatini kuzatib borish va o'n formalarni optimizatsiya qiling.",
                    color: "from-accent/20 to-accent/5",
                  },
                ].map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={idx}
                      className="group"
                      style={{
                        animation: `slideInUp 0.5s ease-out forwards`,
                        animationDelay: `${idx * 0.05}s`,
                      }}
                    >
                      <div
                        className={`bg-gradient-to-br ${feature.color} relative space-y-6 overflow-hidden rounded-2xl border border-border/60 p-8 transition-all duration-300 hover:-translate-y-3 hover:transform hover:border-primary/80 hover:shadow-xl hover:shadow-primary/15 group-hover:scale-105`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                        <div className="relative inline-block">
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-accent opacity-0 blur-xl transition-all duration-300 group-hover:scale-110 group-hover:opacity-40"></div>
                          <div className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-primary/30 bg-gradient-to-br from-primary/30 to-accent/20 transition-all duration-300 group-hover:scale-125 group-hover:border-primary/60">
                            <Icon className="h-7 w-7 text-primary transition-colors group-hover:text-primary" />
                          </div>
                        </div>
                        <div className="relative">
                          <h3 className="mb-3 text-xl font-bold transition-colors group-hover:text-primary">
                            {feature.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground/80">
                            {feature.description}
                          </p>
                        </div>

                        <div className="absolute right-0 top-0 h-32 w-32 -translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-to-br from-accent/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                {Array(6)
                  .fill(0)
                  .map((_, idx) => (
                    <CardSkeleton key={idx} />
                  ))}
              </>
            )}
          </div>
        </div>
      </section>

      <section className="scroll-animate bg-muted/20 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 space-y-4 text-center">
            <BlurText className="text-4xl font-bold md:text-5xl" delay={200}>
              Qanday ishlaydi?
            </BlurText>
            <BlurText className="text-lg text-muted-foreground" delay={400}>
              Uchta oddiy qadam — botingiz tayyor!
            </BlurText>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                number: "1",
                icon: Code2,
                title: "Shablonni tanlang",
                description:
                  "Turli xil biznes ehtiyojlari uchun oldindan tayyorlangan Telegram bot shablonlaridan tanlang.",
              },
              {
                number: "2",
                icon: Smartphone,
                title: "Moslang",
                description:
                  "Kod yozmasdan bot xatti-harakatini, xabarlarni va sozlamalarini o'zgartiring.",
              },
              {
                number: "3",
                icon: Sparkles,
                title: "Ishga tushiring",
                description:
                  "Botni Telegramga darhol joylang va foydalanuvchilarga xizmat ko'rsatishni boshlang.",
              },
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="group relative"
                  style={{
                    animation: `slideInUp 0.5s ease-out forwards`,
                    animationDelay: `${idx * 0.1}s`,
                  }}
                >
                  <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary/40 to-accent/40 opacity-0 blur-lg transition-all duration-300 group-hover:opacity-60"></div>
                  <div className="relative h-full space-y-5 rounded-2xl border border-border/60 bg-gradient-to-br from-card to-card/80 p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:transform hover:border-primary/80 group-hover:shadow-lg group-hover:shadow-primary/20">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/30 to-accent/20 text-primary transition-all duration-300 group-hover:rotate-6 group-hover:scale-125 group-hover:border-primary/60">
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold transition-colors group-hover:text-primary">
                      {step.title}
                    </h3>
                    <p className="leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground/80">
                      {step.description}
                    </p>
                  </div>
                  {idx < 2 && (
                    <div className="absolute -right-4 top-1/2 hidden -translate-y-1/2 transform text-muted-foreground/30 opacity-0 transition-all duration-300 group-hover:text-primary/60 group-hover:opacity-100 md:block">
                      <ArrowRight className="h-8 w-8" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="scroll-animate px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 space-y-4 text-center">
            <BlurText className="text-4xl font-bold md:text-5xl" delay={200}>
              Foydalanuvchilar nima deyishadi
            </BlurText>
            <BlurText className="text-lg text-muted-foreground" delay={400}>
              5 yulduzli reytinglar haqiqiy customer feedbackidan
            </BlurText>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonialsLoaded ? (
              <>
                {[
                  {
                    name: "Alisher U.",
                    role: "E-commerce biznes",
                    feedback:
                      "BotMather bilan 2 kundan keyin sot botni ishga tushirdim. Juda oson va qulayyyim!",
                    rating: 5,
                  },
                  {
                    name: "Fotima K.",
                    role: "SPA salon",
                    feedback:
                      "Booking bot 3 oyda 40% ko'p buyurtma keltirib berdi. Eng yaxshi investitsiya!",
                    rating: 5,
                  },
                  {
                    name: "Javohir B.",
                    role: "Online kurs",
                    feedback:
                      "Avtomatik javoblar botini yaratib, customer support vaqtim 50% qisqardi.",
                    rating: 5,
                  },
                ].map((testimonial, idx) => (
                  <div
                    key={idx}
                    className="group"
                    style={{
                      animation: `slideInUp 0.5s ease-out forwards`,
                      animationDelay: `${idx * 0.1}s`,
                    }}
                  >
                    <div className="relative space-y-5 overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-card to-card/90 p-8 transition-all duration-300 hover:-translate-y-2 hover:transform hover:border-primary/80 hover:shadow-xl hover:shadow-primary/15 group-hover:scale-105">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                      <div className="relative space-y-5">
                        <div className="flex gap-1.5">
                          {Array(testimonial.rating)
                            .fill(0)
                            .map((_, i) => (
                              <Star
                                key={i}
                                className="h-5 w-5 fill-accent text-accent transition-transform duration-300 group-hover:scale-110"
                                style={{
                                  transitionDelay: `${i * 50}ms`,
                                }}
                              />
                            ))}
                        </div>
                        <p className="italic leading-relaxed text-foreground transition-colors group-hover:text-foreground/95">
                          "{testimonial.feedback}"
                        </p>
                        <div className="space-y-2 pt-2">
                          <p className="text-sm font-bold transition-colors group-hover:text-primary">
                            {testimonial.name}
                          </p>
                          <p className="text-xs text-muted-foreground transition-colors group-hover:text-muted-foreground/80">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>

                      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-accent/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {Array(3)
                  .fill(0)
                  .map((_, idx) => (
                    <TestimonialSkeleton key={idx} />
                  ))}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="scroll-animate-scale px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="relative space-y-8 overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 p-12 text-center md:p-16">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-primary blur-3xl"></div>
            </div>

            <div className="relative space-y-4">
              <BlurText className="text-4xl font-bold md:text-5xl" delay={200}>
                Hozir boshlang!
              </BlurText>
              <BlurText className="text-xl text-muted-foreground" delay={400}>
                Bepul shablondan boshlang — birinchi bot bepul!
              </BlurText>
            </div>

            <div className="relative flex flex-col justify-center gap-4 pt-4 sm:flex-row">
              <Link
                href="/template
                "
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/40 active:scale-95"
              >
                Shablonlarni ko'rish
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/price"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-primary/50 bg-background/50 px-8 py-4 font-semibold text-foreground transition-all duration-300 hover:scale-105 hover:bg-background/80 active:scale-95"
              >
                Narxlarni ko'rish
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
