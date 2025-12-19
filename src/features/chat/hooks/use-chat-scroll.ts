// ChatScrollManager.ts
import { useEffect, useRef, useState } from "react";
import { useChatStore } from "@/features/chat/store/chat-store";

export function useChatScroll(containerRef: React.RefObject<HTMLDivElement>) {
  const shouldForceScroll = useChatStore((s) => s.shouldForceScroll);
  const setShouldForceScroll = useChatStore((s) => s.setShouldForceScroll);

  const bottomRef = useRef<HTMLDivElement>(null);
  const [isScrolledUp, setIsScrolledUp] = useState(false);

  // initial mount
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, []);

  // user intent scroll
  useEffect(() => {
    if (!shouldForceScroll) return;

    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    setShouldForceScroll(false);
    setIsScrolledUp(false);
  }, [shouldForceScroll, setShouldForceScroll]);

  // scroll listener
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
      setIsScrolledUp(distance > 120);
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [containerRef]);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    setIsScrolledUp(false);
  };

  return {
    bottomRef,
    isScrolledUp,
    scrollToBottom,
  };
}
