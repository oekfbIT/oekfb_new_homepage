import assert from "node:assert/strict";
import { test } from "node:test";
import { createVisitorId, getVisitorId, nextVote, readVote, saveVote } from "../src/components/PreviewFeedback/storage.mjs";

const storage = () => {
  const entries = new Map();
  return { getItem: (key) => entries.get(key) ?? null, setItem: (key, value) => entries.set(key, value), removeItem: (key) => entries.delete(key), entries };
};

test("reading a preview creates no anonymous visitor identifier", () => {
  const store = storage();
  assert.equal(readVote(store, "match", "version"), null);
  assert.equal(store.entries.size, 0);
});

test("active voting creates and reuses a random visitor ID", () => {
  const store = storage();
  const id = "12345678-1234-4234-9234-123456789abc";
  let created = 0;
  assert.equal(getVisitorId(store, () => { created += 1; return id; }), id);
  assert.equal(getVisitorId(store, () => { throw new Error("Should reuse"); }), id);
  assert.equal(created, 1);
});

test("browsers without randomUUID use secure random bytes and fail safely without crypto", () => {
  const crypto = { getRandomValues: (bytes) => bytes.fill(0) };
  assert.match(createVisitorId(crypto), /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  assert.throws(() => createVisitorId(null), /Secure random/);
});

test("a saved vote is scoped to the exact match and published version", () => {
  const store = storage();
  saveVote(store, "match", "old", "like");
  assert.equal(readVote(store, "match", "old"), "like");
  assert.equal(readVote(store, "match", "new"), null);
  assert.equal(readVote(store, "other-match", "old"), null);
  saveVote(store, "match", "new", "dislike");
  assert.equal(readVote(store, "match", "new"), "dislike");
  saveVote(store, "match", "new", null);
  assert.equal(readVote(store, "match", "new"), null);
});

test("the same button removes a vote and the other button switches it", () => {
  assert.equal(nextVote(null, "like"), "like");
  assert.equal(nextVote("like", "like"), null);
  assert.equal(nextVote("like", "dislike"), "dislike");
  assert.equal(nextVote("dislike", "dislike"), null);
});

test("blocked storage and malformed saved values do not break preview feedback", () => {
  const blocked = { getItem() { throw new Error("Blocked"); }, setItem() { throw new Error("Blocked"); }, removeItem() { throw new Error("Blocked"); } };
  assert.equal(getVisitorId(blocked, () => "memory-only"), "memory-only");
  assert.equal(readVote(blocked, "match", "version"), null);
  assert.doesNotThrow(() => saveVote(blocked, "match", "version", "like"));
  const store = storage();
  store.setItem("oekfb.preview-feedback.vote.match", "invalid JSON");
  assert.equal(readVote(store, "match", "version"), null);
  store.setItem("oekfb.preview-feedback.vote.match", JSON.stringify({ version: "version", vote: "invalid" }));
  assert.equal(readVote(store, "match", "version"), null);
});
