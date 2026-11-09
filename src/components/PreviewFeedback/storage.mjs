const visitorKey = "oekfb.preview-feedback.visitor";
const voteKey = (matchId) => `oekfb.preview-feedback.vote.${matchId}`;

export function createVisitorId(crypto) {
  if (typeof crypto?.randomUUID === "function") return crypto.randomUUID();
  if (typeof crypto?.getRandomValues !== "function") throw new Error("Secure random IDs unavailable");
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 15) | 64;
  bytes[8] = (bytes[8] & 63) | 128;
  const hex = [...bytes].map((value) => value.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function getVisitorId(storage, createId) {
  try {
    const stored = storage?.getItem(visitorKey);
    if (/^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(stored || "")) return stored;
  } catch { /* Browsers may block storage; voting can still work in memory. */ }
  const id = createId();
  try { storage?.setItem(visitorKey, id); } catch { /* Retained by the mounted component. */ }
  return id;
}

export function readVote(storage, matchId, version) {
  try {
    const saved = JSON.parse(storage?.getItem(voteKey(matchId)) || "null");
    return saved?.version === version && ["like", "dislike"].includes(saved.vote) ? saved.vote : null;
  } catch { return null; }
}

export function saveVote(storage, matchId, version, vote) {
  try {
    if (vote == null) storage?.removeItem(voteKey(matchId));
    else storage?.setItem(voteKey(matchId), JSON.stringify({ version, vote }));
  } catch { /* A successful server vote remains saved even if storage is unavailable. */ }
}

export function nextVote(selected, clicked) { return selected === clicked ? null : clicked; }
