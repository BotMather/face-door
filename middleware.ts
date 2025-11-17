import createIntlMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { localeConfig } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(localeConfig);

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1️⃣ Agar til yo'q bo'lsa, default til qo'shish
  const hasLocale = localeConfig.locales.some((locale) =>
    pathname.startsWith(`/${locale}`),
  );
  if (!hasLocale) {
    return intlMiddleware(req);
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"], // Middleware faqat sahifalar uchun ishlaydi
};
