import { ChatHeader } from './chat-header';
import { ChatMessages } from './chat-messages';
import { ChatInput } from './chat-input';

export function ChatLayout() {
  return (
    <div className="flex h-screen flex-col bg-background">
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
    </div>
  );
}
