import { useChatStore } from "@/features/chat/store/chat-store";
import { createChatStreamConnection } from "./create-chat-stream";
import { createSessionId } from "../helpers";
import { buildChatStreamUrl } from "@/lib/utils";
import { startChatStream } from "../api";
import type { HandleStreamMessageParams } from "../types";

const chatStreamConnection = createChatStreamConnection();

const handleStreamMessage = ({
  data,
  sessionId,
  assistantMessageId,
}: HandleStreamMessageParams) => {
  const store = useChatStore.getState();

  //* If the session id is not the same, return
  if (data.sessionId !== sessionId) return;

  //* If the chat is done, disconnect the connection
  if (data.done === true) {
    store.completeGeneration();
    chatStreamConnection.disconnect();
    return;
  }

  //* If there is no active session, return
  const session = store.activeChatSession;
  if (!session) return;

  //* Ignore duplicate chunks
  if (data.index <= session.lastReceivedChunkIndex) return;

  store.appendToMessage(assistantMessageId, data.chunk);
  store.updateReceivedChunks(data.index);
};

export const startNewChatStream = async (message: string) => {
  const store = useChatStore.getState();
  if (store.activeChatSession?.status === "streaming") return;

  const sessionId = createSessionId();

  //* add the user/assistant messages to the store
  store.addMessage({ role: "user", content: message });
  const assistantMessageId = store.addMessage({
    role: "assistant",
    content: "",
  });

  store.startChatSession(sessionId, assistantMessageId);

  //* post the message to the server
  await startChatStream({ sessionId, message });

  //* connect to the chat stream
  chatStreamConnection.connect(buildChatStreamUrl(sessionId, 0), {
    onMessage: (data) =>
      handleStreamMessage({ data, sessionId, assistantMessageId }),
    onError: () => {
      //! If there is an error, disconnect the connection
      chatStreamConnection.disconnect();
    },
  });
};

export const reconnectToChatStream = () => {
  const store = useChatStore.getState();
  if (
    !store.activeChatSession ||
    store.activeChatSession.status !== "streaming"
  )
    return;

  const { sessionId, assistantMessageId, lastReceivedChunkIndex } =
    store.activeChatSession;

  chatStreamConnection.connect(
    buildChatStreamUrl(sessionId, lastReceivedChunkIndex + 1),
    {
      onMessage: (data) =>
        handleStreamMessage({ data, sessionId, assistantMessageId }),
      onError: () => {
        //! If there is an error, disconnect the connection
        chatStreamConnection.disconnect();
      },
    }
  );
};

export const disconnectChatStream = () => {
  chatStreamConnection.disconnect();
  useChatStore.getState().clearChatSession();
};
