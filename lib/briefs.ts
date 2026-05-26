export type Brief = {
  id: string;
  artist?: string;
  releaseTitle?: string;
  audience?: string;
  goal?: string;
  summary?: string;
  createdAt: string;
  publishedAt?: string | null;
};

const briefs: Brief[] = [];

function generateId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // Fallback
  return Math.random().toString(36).slice(2, 9);
}

export function addBrief(payload: Partial<Brief>) {
  const now = new Date().toISOString();
  const brief: Brief = {
    id: generateId(),
    artist: payload.artist,
    releaseTitle: payload.releaseTitle,
    audience: payload.audience,
    goal: payload.goal,
    summary: payload.summary,
    createdAt: now,
    publishedAt: payload.publishedAt ?? null
  };
  briefs.unshift(brief);
  return brief;
}

export function getBriefs() {
  return briefs;
}

export function clearBriefs() {
  briefs.length = 0;
}

export default { addBrief, getBriefs, clearBriefs };
