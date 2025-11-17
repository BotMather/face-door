"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ExternalLink, Send } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

interface OtpAuthDialogProps {
  logo?: any;
  children: React.ReactNode;
}

export function OtpAuthDialog({ logo, children }: OtpAuthDialogProps) {
  const [open, setOpen] = useState(false);

  async function Login(code: string) {
    const toastId = toast.loading("Loading...");

    const response = await signIn("credentials", {
      redirect: false,
      code,
    });

    if (!response?.ok) {
      toast.success("Code xato!", { id: toastId });
    }
    toast.success("Hissobga kirdingiz", { id: toastId });
    setOpen(false);
  }

  const [code, setCode] = useState("");

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader className="space-y-3 text-center">
          <div className="flex flex-col items-center gap-2">
            {logo && (
              <Image
                className="rounded-2xl"
                src={logo || "/placeholder.svg"}
                alt="Logo"
                width={100}
                height={100}
                priority
              />
            )}
            <AlertDialogTitle className="text-xl">
              Botmather hisobiga kirish
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm">
              Kirish uchun Telegram botimizdan 6 xonali kod oling.
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>

        <div className="space-y-4">
          {/* Steps */}
          <div className="space-y-2">
            <p className="font-medium text-foreground">Qanday kiriladi?</p>
            <ol className="list-inside list-decimal space-y-1 text-left text-muted-foreground">
              <li>Telegram'da @botmother_authbot sahifasini oching</li>
              <li>Start bosing va 6 xonali kod oling</li>
              <li>Kodda raqamlarni shu yerga kiriting</li>
            </ol>
          </div>

          {/* Telegram button */}
          <a
            className={buttonVariants({
              className: "flex w-full gap-2",
            })}
            href="https://t.me/botmother_authbot"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Telegram botni ochish
          </a>

          {/* Or text */}
          <div className="text-center text-muted-foreground">
            yoki Pastga kodingizni kiriting
          </div>

          {/* OTP Input */}
          <div className="flex justify-center">
            <InputOTP onChange={setCode} maxLength={6} className="w-full">
              <>
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="h-12 w-10 text-xl" />
                  <InputOTPSlot index={1} className="h-12 w-10 text-xl" />
                  <InputOTPSlot index={2} className="h-12 w-10 text-xl" />
                  <InputOTPSlot index={3} className="h-12 w-10 text-xl" />
                  <InputOTPSlot index={4} className="h-12 w-10 text-xl" />
                  <InputOTPSlot index={5} className="h-12 w-10 text-xl" />
                </InputOTPGroup>
              </>
            </InputOTP>
          </div>

          {/* Note */}
          <div className="text-center text-muted-foreground">
            Kod 10 daqiqa davomida amal qiladi
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <AlertDialogCancel onClick={() => setOpen(false)} className="flex-1">
            Yopish
          </AlertDialogCancel>
          <Button
            onClick={() => Login(code)}
            disabled={code.length < 6}
            className="flex-1"
          >
            <Send className="mr-2 h-4 w-4" />
            Yuborish
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
