"use client";

import { TemplateDetailType } from "@/types/template";
import { useSession } from "next-auth/react";
import { OtpAuthDialog } from "./otp-dialog";
import { useState } from "react";

export function HeroSection({ data }: { data: TemplateDetailType }) {
  const [otpIsOpen, setOTPIsOpen] = useState(false);

  const session = useSession();

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <span>Categories</span>
        <span>/</span>
        <span>Blog</span>
        <span>/</span>
        <span className="text-foreground">Isla</span>
      </div>
      {/* Title and Description */}
      <div className="mb-12 max-w-3xl">
        <h1 className="mb-6 text-5xl font-bold leading-tight text-foreground md:text-6xl">
          {data.name}
        </h1>
        <div
          dangerouslySetInnerHTML={{ __html: data.short_description }}
          className="prose max-w-none text-primary"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        {session.status === "unauthenticated" ? (
          <>
            <OtpAuthDialog>
              <button className="rounded-full bg-foreground px-6 py-3 font-semibold text-background transition-opacity hover:opacity-90">
                Bepul olish!
              </button>
            </OtpAuthDialog>
          </>
        ) : data.price <= 0 ? (
          <button className="rounded-full bg-foreground px-6 py-3 font-semibold text-background transition-opacity hover:opacity-90">
            Bepul olish!
          </button>
        ) : (
          <button className="rounded-full bg-foreground px-6 py-3 font-semibold text-background transition-opacity hover:opacity-90">
            Sotib olish
          </button>
        )}
        <button className="rounded-full border border-border px-6 py-3 text-foreground transition-colors hover:bg-accent/50">
          Preview
        </button>
      </div>
    </section>
  );
}
