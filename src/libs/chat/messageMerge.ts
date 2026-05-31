export type DedupeMessage = {
  id: string;
  idempotencyKey?: string;
  sequence?: number;
  createdAt?: string;
};

export const getMessageDedupeKey = (message: DedupeMessage) =>
  message.idempotencyKey || message.id;

const sameMessage = (left: DedupeMessage, right: DedupeMessage) => {
  const leftKey = getMessageDedupeKey(left);
  const rightKey = getMessageDedupeKey(right);

  return (
    left.id === right.id ||
    leftKey === rightKey ||
    (!!right.idempotencyKey &&
      (left.id === right.idempotencyKey ||
        left.idempotencyKey === right.idempotencyKey)) ||
    (!!left.idempotencyKey && right.id === left.idempotencyKey)
  );
};

const sortMessages = <T extends DedupeMessage>(messages: T[]) =>
  [...messages].sort((a, b) => {
    const sequenceDelta = (a.sequence || 0) - (b.sequence || 0);
    if (sequenceDelta !== 0) return sequenceDelta;
    return (
      new Date(a.createdAt || 0).getTime() -
      new Date(b.createdAt || 0).getTime()
    );
  });

export const mergeChatMessages = <T extends DedupeMessage>(
  existing: T[],
  incoming: T | T[],
) => {
  const merged = [...existing];
  const incomingMessages = Array.isArray(incoming) ? incoming : [incoming];

  for (const message of incomingMessages) {
    const existingIndex = merged.findIndex((item) => sameMessage(item, message));

    if (existingIndex >= 0) {
      merged[existingIndex] = message;
    } else {
      merged.push(message);
    }
  }

  return sortMessages(merged);
};
