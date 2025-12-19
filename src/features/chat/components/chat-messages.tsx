"use client";

import { useRef } from "react";
import { useChatStore } from "@/features/chat/store/chat-store";
import { ChatMessage } from "./chat-message";
import { EmptyState } from "./empty-state";
import { useChatScroll } from "../hooks";
import { ScrollToBottomButton } from "./scroll-to-bottom-button";
import { RenderIf } from "@/components/render-if";

export function ChatMessages() {
  const messages = useChatStore((s) => s.messages);
  const containerRef = useRef<HTMLDivElement>(null);

  const { bottomRef, isScrolledUp, scrollToBottom } =
    useChatScroll(containerRef);

  return (
    <div
      ref={containerRef}
      className="relative flex-1 overflow-y-auto px-4 py-6"
    >
      <RenderIf condition={messages.length === 0}>
        <EmptyState />
      </RenderIf>

      <RenderIf condition={messages.length > 0}>
        <div className="mx-auto max-w-chat space-y-4">
          {messages.map((m) => (
            <ChatMessage key={m.id} message={m} />
          ))}
          <div ref={bottomRef} />
        </div>
      </RenderIf>

      <ScrollToBottomButton visible={isScrolledUp} onClick={scrollToBottom} />
    </div>
  );
}
