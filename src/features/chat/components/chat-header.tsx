export function ChatHeader() {
  return (
    <header className="flex-shrink-0 border-b border-border bg-card px-4 py-3">
      <div className="mx-auto max-w-chat">
        <h1 className="text-lg font-semibold text-foreground">AI Chat</h1>
        <p className="text-sm text-muted-foreground">Streaming conversation demo</p>
      </div>
    </header>
  );
}
