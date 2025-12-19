export const createSessionId = () => {
    const c = globalThis.crypto;
    if (c?.randomUUID) return c.randomUUID();
    return `s_${Math.random().toString(36).slice(2)}_${Date.now()}`;
  };
  