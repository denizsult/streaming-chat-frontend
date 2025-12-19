import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { API_BASE_URL } from "@/config/env";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const buildChatStreamUrl = (sessionId: string, fromIndex: number) =>
  `${API_BASE_URL}/chat/stream/${encodeURIComponent(sessionId)}?fromIndex=${fromIndex}`;
