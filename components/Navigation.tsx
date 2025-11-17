"use client";

import type React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { OtpAuthDialog } from "@/app/[locale]/template/[id]/sections/otp-dialog";

export function Navigation() {
  const session = useSession();

  useEffect(() => {
    console.log(session);
  }, [session]);

  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            <span className="text-primary">Bot</span>
            <span className="text-accent">Mather</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/template"
              className="text-sm text-foreground/70 transition hover:text-foreground"
            >
              Templates
            </Link>
            <Link
              href="/price"
              className="text-sm text-foreground/70 transition hover:text-foreground"
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className="text-sm text-foreground/70 transition hover:text-foreground"
            >
              Contact
            </Link>
          </div>

          {session.status === "unauthenticated" ? (
            <OtpAuthDialog>
              <button className="rounded-full bg-foreground px-6 py-2 font-semibold text-background transition-opacity hover:opacity-90">
                Login
              </button>
            </OtpAuthDialog>
          ) : (
            <></>
          )}
        </div>
      </div>
    </nav>
  );
}
