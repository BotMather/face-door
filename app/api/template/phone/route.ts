import { NextRequest, NextResponse } from "next/server";
import { validateAndNormalizePhone } from "@/lib/phone-validation";
import { sendTelegramMessage, formatTemplateMessage } from "@/lib/telegram";

export const runtime = "nodejs";

// Telegram chat ID - bu admin chat ID bo'lishi kerak
// Environment variable'dan olish yaxshiroq: process.env.TELEGRAM_CHAT_ID
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "5884447415";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { templateId, templateTitle, phoneNumber } = body;

    // Validate required fields
    if (!templateId || !templateTitle || !phoneNumber) {
      return NextResponse.json(
        { error: "Barcha maydonlar to'ldirilishi kerak" },
        { status: 400 },
      );
    }

    // Validate and normalize phone number
    const phoneValidation = validateAndNormalizePhone(phoneNumber);
    if (!phoneValidation.isValid) {
      return NextResponse.json(
        { error: phoneValidation.error },
        { status: 400 },
      );
    }

    const normalizedPhone = phoneValidation.normalized!;

    // Format time
    const now = new Date();
    const timeString = now.toLocaleString("uz-UZ", {
      timeZone: "Asia/Tashkent",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    // Registration data
    const registrationData = {
      templateId,
      templateTitle,
      phoneNumber: normalizedPhone,
      timestamp: now.toISOString(),
      createdAt: now,
    };

    console.log("Template phone registration:", registrationData);

    // Send Telegram message if chat ID is configured
    if (TELEGRAM_CHAT_ID) {
      try {
        const messageText = formatTemplateMessage(
          templateTitle,
          normalizedPhone,
          timeString,
        );

        await sendTelegramMessage({
          chatId: TELEGRAM_CHAT_ID,
          text: messageText,
        });

        console.log("Telegram message sent successfully");
      } catch (telegramError) {
        // Log error but don't fail the request
        console.error("Failed to send Telegram message:", telegramError);
        // Continue with the response even if Telegram fails
      }
    } else {
      console.warn(
        "TELEGRAM_CHAT_ID not configured. Skipping Telegram notification.",
      );
    }

    // TODO: Save to database
    // Example with Prisma:
    // await prisma.templateRegistration.create({
    //   data: {
    //     templateId,
    //     templateTitle,
    //     phoneNumber: normalizedPhone,
    //     createdAt: new Date(),
    //   },
    // });

    return NextResponse.json(
      {
        success: true,
        message: "Telefon raqami muvaffaqiyatli saqlandi",
        data: {
          templateId,
          phoneNumber: normalizedPhone,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error saving phone number:", error);

    // Don't expose internal errors to client
    return NextResponse.json(
      {
        error: "Server xatosi. Iltimos, keyinroq qayta urinib ko'ring.",
      },
      { status: 500 },
    );
  }
}
