import { API_BASE_URL } from "@/config/env";

export interface StartChatPayload {
  sessionId: string;
  message: string;
}

export const startChatStream = async (
  payload: StartChatPayload
): Promise<Response> => {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return response;
};
