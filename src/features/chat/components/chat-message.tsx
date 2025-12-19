import { cn } from '@/lib/utils';
import type { Message } from '@/features/chat/types';
import { RenderIf } from '@/components/render-if';
import { useChatStore } from '@/features/chat/store/chat-store';

export function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  const activeChatSession = useChatStore((state) => state.activeChatSession);
  const isStreaming = activeChatSession?.status === 'streaming' && activeChatSession.assistantMessageId === message.id;
  const isEmpty = !message.content.trim();

  return (
    <div
      className={cn(
        'flex w-full',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'max-w-[85%] rounded-lg px-4 py-3 shadow-chat',
          isUser
            ? 'bg-chat-user text-foreground'
            : 'border border-chat-assistant-border bg-chat-assistant text-foreground',
          isStreaming && 'animate-pulse'
        )}
      >
       
        <RenderIf condition={Boolean(!(isEmpty && isStreaming))}>
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {message.content}
            <RenderIf condition={Boolean(isStreaming)}>
              <span className="ml-1 inline-block h-4 w-0.5 animate-pulse bg-foreground" />
            </RenderIf>
          </div>
        </RenderIf>
      </div>
    </div>
  );
}
