import { NextRequest, NextResponse } from "next/server";
import { validateAndNormalizePhone } from "@/lib/phone-validation";
import { sendTelegramMessage } from "@/lib/telegram";

export const runtime = "nodejs";

// Telegram chat ID - bu admin chat ID bo'lishi kerak
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "5884447415";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phoneNumber, request: userRequest } = body;

    // Validate required fields
    if (!name || !phoneNumber || !userRequest) {
      return NextResponse.json(
        { error: "Barcha maydonlar to'ldirilishi kerak" },
        { status: 400 },
      );
    }

    // Validate phone number
    const phoneValidation = validateAndNormalizePhone(phoneNumber);
    if (!phoneValidation.isValid) {
      return NextResponse.json(
        { error: phoneValidation.error },
        { status: 400 },
      );
    }

    const normalizedPhone = phoneValidation.normalized!;

    // Validate request length
    if (userRequest.trim().length < 10) {
      return NextResponse.json(
        { error: "So'rov kamida 10 ta belgidan iborat bo'lishi kerak" },
        { status: 400 },
      );
    }

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

    // Request data
    const requestData = {
      name: name.trim(),
      phoneNumber: normalizedPhone,
      request: userRequest.trim(),
      timestamp: now.toISOString(),
      createdAt: now,
    };

    console.log("Custom request:", requestData);

    // Send Telegram message if chat ID is configured
    if (TELEGRAM_CHAT_ID) {
      try {
        const messageText = `🆕 Yangi so'rov

👤 Ism: ${name.trim()}
📞 Telefon: ${normalizedPhone}
💬 So'rov:
${userRequest.trim()}

🕔 Vaqt: ${timeString}`;

        await sendTelegramMessage({
          chatId: TELEGRAM_CHAT_ID,
          text: messageText,
        });

        console.log("Telegram message sent successfully");
      } catch (telegramError) {
        // Log error but don't fail the request
        console.error("Failed to send Telegram message:", telegramError);
      }
    } else {
      console.warn(
        "TELEGRAM_CHAT_ID not configured. Skipping Telegram notification.",
      );
    }

    // TODO: Save to database
    // Example with Prisma:
    // await prisma.customRequest.create({
    //   data: {
    //     name: name.trim(),
    //     phoneNumber: normalizedPhone,
    //     request: userRequest.trim(),
    //     createdAt: new Date(),
    //   },
    // });

    return NextResponse.json(
      {
        success: true,
        message: "So'rovingiz muvaffaqiyatli yuborildi",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error saving custom request:", error);

    return NextResponse.json(
      {
        error: "Server xatosi. Iltimos, keyinroq qayta urinib ko'ring.",
      },
      { status: 500 },
    );
  }
}
