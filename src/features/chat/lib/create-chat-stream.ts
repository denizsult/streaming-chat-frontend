import { ChatStreamHandlers } from "../types";

export const createChatStreamConnection = () => {
  let eventSource: EventSource | null = null;

  const connect = (url: string, handlers: ChatStreamHandlers) => {
    disconnect();
    eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      handlers.onMessage(data);
    };

    eventSource.onerror = (e) => {
      disconnect();
      handlers.onError?.();
    };
  };

  const disconnect = () => {
    eventSource?.close();
    eventSource = null;
  };

  return { connect, disconnect };
};
