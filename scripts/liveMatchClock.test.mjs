import test from "node:test";
import assert from "node:assert/strict";
import { getElapsedTime, getMatchStatusText, HALF_DURATION_MINUTES } from "../src/utils/liveMatchClock.mjs";

test("25-minute halves use actual elapsed time in winter and summer in every visitor timezone", () => {
  const previous = process.env.TZ;
  try {
    for (const zone of ["Europe/Vienna", "America/Punta_Arenas", "America/Los_Angeles", "Asia/Tokyo"]) {
      process.env.TZ = zone;
      for (const day of ["2026-11-15", "2026-06-15"]) {
        const start = `${day}T14:00:00Z`;
        const now = Date.parse(`${day}T14:08:00Z`);
        assert.equal(getMatchStatusText("first", start, undefined, undefined, now), "LIVE - 1. HB: 8'");
        assert.equal(getMatchStatusText("second", undefined, start, undefined, now), "LIVE - 2. HB: 33'");
      }
    }
  } finally {
    if (previous === undefined) delete process.env.TZ;
    else process.env.TZ = previous;
  }
});

test("half boundaries and stoppage time retain the 50-minute match duration", () => {
  assert.equal(HALF_DURATION_MINUTES, 25);
  const first = "2026-11-15T14:00:00Z";
  const second = "2026-11-15T14:30:00Z";
  assert.equal(getElapsedTime(first, 0, Date.parse(first)), "0'");
  assert.equal(getElapsedTime(first, 0, Date.parse("2026-11-15T14:25:00Z")), "25'");
  assert.equal(getElapsedTime(second, HALF_DURATION_MINUTES, Date.parse(second)), "25'");
  assert.equal(getElapsedTime(second, HALF_DURATION_MINUTES, Date.parse("2026-11-15T14:55:00Z")), "50'");
  assert.equal(getElapsedTime(second, HALF_DURATION_MINUTES, Date.parse("2026-11-15T14:58:00Z")), "53'");
  assert.equal(getMatchStatusText("halftime", first, second), "Halbzeit");
  assert.equal(getMatchStatusText("completed", first, second), "Spiel Abgeschlossen");
});

test("explicit offsets and Mongo timestamps denote the same instant", () => {
  const now = Date.parse("2026-11-15T14:08:00Z");
  for (const start of ["2026-11-15T14:00:00Z", "2026-11-15T15:00:00+01:00", { $date: "2026-11-15T14:00:00Z" }]) {
    assert.equal(getElapsedTime(start, HALF_DURATION_MINUTES, now), "33'");
  }
});

test("elapsed time remains correct across both Vienna daylight saving transitions", () => {
  for (const day of ["2026-03-29", "2026-10-25"]) {
    assert.equal(getElapsedTime(`${day}T00:55:00Z`, 25, Date.parse(`${day}T01:05:00Z`)), "35'");
  }
});

test("clock uses Date.now and advances at the minute boundary", (t) => {
  let now = Date.parse("2026-11-15T14:08:59Z");
  t.mock.method(Date, "now", () => now);
  const start = "2026-11-15T14:00:00Z";
  assert.equal(getMatchStatusText("second", undefined, start), "LIVE - 2. HB: 33'");
  now += 1000;
  assert.equal(getMatchStatusText("second", undefined, start), "LIVE - 2. HB: 34'");
});

test("missing, invalid and future half-start dates have safe fallbacks", () => {
  const now = Date.parse("2026-11-15T14:00:00Z");
  assert.equal(getElapsedTime(undefined, 0, now), "0'");
  assert.equal(getElapsedTime("invalid", 25, now), "0'");
  assert.equal(getElapsedTime("2026-11-15T14:01:00Z", 25, now), "25'");
  assert.equal(getMatchStatusText("second", undefined, undefined, "Datum nicht Zugewiesen", now), "Datum nicht Zugewiesen");
});
