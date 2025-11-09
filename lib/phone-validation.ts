/**
 * Validates and normalizes Uzbek phone numbers
 * Accepts formats: +998901234567, 998901234567, 901234567
 */

const PHONE_REGEX = /^(\+998|998)?[0-9]{9}$/;
const UZBEK_PHONE_PREFIX = "+998";

export interface PhoneValidationResult {
  isValid: boolean;
  normalized?: string;
  error?: string;
}

/**
 * Validates and normalizes a phone number
 * @param phoneNumber - The phone number to validate
 * @returns Validation result with normalized phone number
 */
export function validateAndNormalizePhone(
  phoneNumber: string,
): PhoneValidationResult {
  const cleanPhone = phoneNumber.replace(/\s/g, "").trim();

  if (!cleanPhone) {
    return {
      isValid: false,
      error: "Telefon raqami kiritilishi shart",
    };
  }

  if (!PHONE_REGEX.test(cleanPhone)) {
    return {
      isValid: false,
      error:
        "Iltimos, to'g'ri telefon raqamini kiriting (masalan: +998901234567)",
    };
  }

  // Normalize phone number to +998XXXXXXXXX format
  let normalized = cleanPhone;
  if (normalized.startsWith("+")) {
    // Already has +, ensure it starts with +998
    if (!normalized.startsWith(UZBEK_PHONE_PREFIX)) {
      normalized = normalized.replace(/^\+/, UZBEK_PHONE_PREFIX);
    }
  } else if (normalized.startsWith("998")) {
    // Starts with 998, add +
    normalized = `+${normalized}`;
  } else {
    // Just 9 digits, add +998
    normalized = `${UZBEK_PHONE_PREFIX}${normalized}`;
  }

  // Final validation: should be exactly +998 + 9 digits
  if (!/^\+998[0-9]{9}$/.test(normalized)) {
    return {
      isValid: false,
      error: "Telefon raqami formati noto'g'ri",
    };
  }

  return {
    isValid: true,
    normalized,
  };
}
