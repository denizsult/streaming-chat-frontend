import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ChatMessageSkeletonProps {
  isUser?: boolean;
}

export function ChatMessageSkeleton({ isUser = false }: ChatMessageSkeletonProps) {
  return (
    <div
      className={cn(
        "flex w-full",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "  w-[50%] rounded-lg px-4 py-3 shadow-chat space-y-2",
          isUser
            ? "bg-chat-user"
            : "border border-chat-assistant-border bg-chat-assistant"
        )}
      >
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[75%]" />
      </div>
    </div>
  );
}

export function ChatSkeletonLoader() {
  return (
    <div className="mx-auto max-w-chat space-y-4">
      <ChatMessageSkeleton isUser />
      <ChatMessageSkeleton />
      <ChatMessageSkeleton isUser />
      <ChatMessageSkeleton />
    </div>
  );
}
