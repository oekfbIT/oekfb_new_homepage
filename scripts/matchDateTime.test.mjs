import test from "node:test";
import assert from "node:assert/strict";
import { formatViennaMatchDate, formatViennaMatchTime } from "../src/utils/viennaMatchDate.mjs";

test("UTC kickoff is displayed in Vienna regardless of the visitor's timezone", () => {
  const previous = process.env.TZ;
  try {
    for (const zone of ["America/Santiago", "Europe/Vienna", "America/Los_Angeles"]) {
      process.env.TZ = zone;
      assert.equal(formatViennaMatchTime("2026-12-06T15:00:00Z"), "16:00");
      assert.equal(formatViennaMatchTime("2026-06-06T15:00:00Z"), "17:00");
      assert.equal(formatViennaMatchDate("2026-12-06T23:30:00Z"), "07.12.");
    }
  } finally { if (previous === undefined) delete process.env.TZ; else process.env.TZ = previous; }
});

test("explicit offsets, Mongo date wrappers and undated values are handled", () => {
  assert.equal(formatViennaMatchTime("2026-06-06T19:00:00+02:00"), "19:00");
  assert.equal(formatViennaMatchTime("2026-12-06T19:00:00"), "19:00");
  assert.equal(formatViennaMatchTime({ $date: "2026-12-06T15:00:00Z" }), "16:00");
  assert.equal(formatViennaMatchDate("invalid"), "Ungültiges Datum");
});
