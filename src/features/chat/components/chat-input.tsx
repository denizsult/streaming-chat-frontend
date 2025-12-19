"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { Send, StopCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RenderIf } from "@/components/render-if";
import { useChatStore } from "@/features/chat/store/chat-store";
import {
  disconnectChatStream,
  startNewChatStream,
} from "../lib/chat-stream-manager";

export function ChatInput() {
  const [input, setInput] = useState("");
  const setShouldForceScroll = useChatStore((state) => state.setShouldForceScroll);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const activeChatSession = useChatStore((state) => state.activeChatSession);
  const isStreaming = activeChatSession?.status === "streaming";

  const handleSubmit = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;
    setInput("");
    setShouldForceScroll(true);
    await startNewChatStream(trimmed);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(input);
    }
  };

  const handleStopStreaming = () => {
    disconnectChatStream();
  };

  return (
    <div className="flex-shrink-0 border-t border-border bg-card px-4 py-4">
      <div className="mx-auto max-w-chat">
        <div className="flex gap-3">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Send a message..."
            disabled={isStreaming}
            className="min-h-[52px] max-h-[200px] resize-none"
            rows={1}
          />
          <RenderIf condition={isStreaming}>
            <Button
              onClick={handleStopStreaming}
              variant="destructive"
              size="icon"
              className="h-[52px] w-[52px] flex-shrink-0 bg-red-500 hover:bg-red-600  "
            >
              <StopCircle className="h-5 w-5 fill-current" />
            </Button>
          </RenderIf>
          <RenderIf condition={!isStreaming}>
            <RenderIf condition={!isStreaming}>
              <Button
                onClick={() => handleSubmit(input)}
                disabled={!input.trim() || isStreaming}
                size="icon"
                className="h-[52px] w-[52px] flex-shrink-0"
              >
                <Send className="h-5 w-5" />
                <span className="sr-only">Send message</span>
              </Button>
            </RenderIf>
          </RenderIf>
        </div>

        <p className="mt-2 text-center text-xs text-muted-foreground">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
