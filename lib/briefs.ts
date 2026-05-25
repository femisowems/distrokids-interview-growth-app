export type Brief = {
  id: string;
  artist: string;
  releaseTitle: string;
  audience: string;
  goal: string;
  result?: string;
  status: 'draft' | 'published';
  createdAt: string;
  publishedAt?: string;
};

const briefs: Brief[] = [];

function generateId() {
  // Prefer the runtime crypto API when available (Node 20+ / Edge runtime)
  // Fallback to a simple time+random hex string for older environments.
  if (typeof globalThis !== 'undefined' && typeof (globalThis as any).crypto?.randomUUID === 'function') {
    return (globalThis as any).crypto.randomUUID();
  }

  const rand = Math.floor(Math.random() * 0xfffff).toString(16);
  return `${Date.now().toString(16)}-${rand}`;
}

export function listBriefs() {
  return briefs.slice().reverse();
}

export function addBrief(payload: Omit<Partial<Brief>, 'id' | 'createdAt'> & { artist: string; releaseTitle: string; audience: string; goal: string; status: 'draft' | 'published' }) {
  const brief: Brief = {
    id: generateId(),
    artist: payload.artist,
    releaseTitle: payload.releaseTitle,
    audience: payload.audience,
    goal: payload.goal,
    result: payload.result,
    status: payload.status,
    createdAt: new Date().toISOString(),
    publishedAt: payload.status === 'published' ? new Date().toISOString() : undefined
  };

  briefs.push(brief);
  return brief;
}
