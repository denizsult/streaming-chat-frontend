import { MessageSquare } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <MessageSquare className="h-6 w-6 text-muted-foreground" />
        </div>
        <h2 className="mb-2 text-lg font-medium text-foreground">
          Start a conversation
        </h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          Send a message to begin chatting with the AI assistant. 
          Your conversation will appear here.
        </p>
      </div>
    </div>
  );
}
