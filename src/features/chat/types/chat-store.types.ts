export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export type ActiveChatSession = {
  sessionId: string;
  assistantMessageId: string;
  lastReceivedChunkIndex: number;
  status: "streaming" | "done";
};

export interface ChatState {
  messages: Message[];
  activeChatSession: ActiveChatSession | null;
  shouldForceScroll: boolean;
  setShouldForceScroll: (shouldForceScroll: boolean) => void;
  addMessage: (message: Omit<Message, "id">) => string;
  updateMessageContent: (id: string, content: string) => void;
  appendToMessage: (id: string, chunk: string) => void;
  startChatSession: (sessionId: string, assistantMessageId: string) => void;
  updateReceivedChunks: (lastReceivedChunkIndex: number) => void;
  completeGeneration: () => void;
  clearChatSession: () => void;
  clearMessages: () => void;
}
