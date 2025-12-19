"use client";

import { ChatLayout } from "@/features/chat/components/chat-layout";
import { reconnectToChatStream } from "@/features/chat/lib/chat-stream-manager";
import { useEffect } from "react";
const HomePage = () => {
  useEffect(() => {
    reconnectToChatStream();
  }, []);
  return <ChatLayout />;
};

export default HomePage;

