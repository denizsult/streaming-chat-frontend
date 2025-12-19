export * from "./chat-store.types";
export type ChatStreamEventName = 'meta' | 'chunk' | 'done';

export type ChatStreamMeta = {
  sessionId: string;
  createdAt: number;
  totalChunks: number;
  totalSeconds: number;
};

export type ChatStreamChunk = {
  sessionId: string;
  chunk: string;
  index: number;
};

export type ChatStreamDone = {
  sessionId: string;
  done: true;
  message: string;
  totalChunks: number;
};

export type ChatStreamEvent =
  | { event: 'meta'; id?: string; data: ChatStreamMeta }
  | { event: 'chunk'; id?: string; data: ChatStreamChunk }
  | { event: 'done'; id?: string; data: ChatStreamDone };


export type ChatStreamHandlers = {
  onMessage: (data: unknown) => void;
  onError?: () => void;
};

export type HandleStreamMessageParams = {
  data: any;
  sessionId: string;
  assistantMessageId: string;
};
  

