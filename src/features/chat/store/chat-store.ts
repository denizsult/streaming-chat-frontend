import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { ChatState } from "../types";

const generateId = (): string => Math.random().toString(36).substring(2, 9);

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      activeChatSession: null,
      shouldForceScroll: false,
      setShouldForceScroll: (shouldForceScroll) => {
        set({ shouldForceScroll });
      },
      addMessage: (message) => {
        const id = generateId();
        set((state) => ({
          messages: [...state.messages, { ...message, id }],
        }));
        return id;
      },

      updateMessageContent: (id, content) => {
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === id ? { ...msg, content } : msg
          ),
        }));
      },

      appendToMessage: (id, chunk) => {
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === id ? { ...msg, content: msg.content + chunk } : msg
          ),
        }));
      },

      startChatSession: (sessionId, assistantMessageId) => {
        set({
          activeChatSession: {
            sessionId,
            assistantMessageId,
            lastReceivedChunkIndex: -1,
            status: "streaming",
          },
        });
      },

      updateReceivedChunks: (lastReceivedChunkIndex) => {
        set((state) => {
          if (!state.activeChatSession) return state;

          return {
            activeChatSession: {
              ...state.activeChatSession,
              lastReceivedChunkIndex,
            },
          };
        });
      },

      completeGeneration: () => {
        set((state) => {
          if (!state.activeChatSession) return state;

          return {
            activeChatSession: {
              ...state.activeChatSession,
              status: "done",
            },
          };
        });
      },

      clearChatSession: () => {
        set({ activeChatSession: null });
      },

      clearMessages: () => {
        set({
          messages: [],
          activeChatSession: null,
        });
      },
    }),

    {
      name: "chat-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        messages: state.messages,
        activeChatSession: state.activeChatSession,
      }),
    }
  )
);
