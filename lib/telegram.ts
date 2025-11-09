/**
 * Telegram Bot API utility functions
 */

const TELEGRAM_BOT_TOKEN = "7849406124:AAGY3r7gXIVRyoHuNHymGy8DBRpasxRBSuU";
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

export interface SendMessageParams {
  chatId: string | number;
  text: string;
  parseMode?: "HTML" | "Markdown" | "MarkdownV2";
}

export interface SendMessageResponse {
  ok: boolean;
  result?: {
    message_id: number;
    date: number;
    text: string;
  };
  error_code?: number;
  description?: string;
}

/**
 * Send a message to a Telegram chat
 * @param params - Message parameters
 * @returns Response from Telegram API
 */
export async function sendTelegramMessage(
  params: SendMessageParams,
): Promise<SendMessageResponse> {
  try {
    const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: params.chatId,
        text: params.text,
        parse_mode: params.parseMode,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.description || `Telegram API error: ${response.statusText}`,
      );
    }

    return data;
  } catch (error) {
    console.error("Error sending Telegram message:", error);
    throw error;
  }
}

/**
 * Format template registration message
 */
export function formatTemplateMessage(
  templateTitle: string,
  phoneNumber: string,
  time: string,
): string {
  return `🪧 Template: ${templateTitle}
📞 Phone: ${phoneNumber}
🕔 Time: ${time}`;
}
