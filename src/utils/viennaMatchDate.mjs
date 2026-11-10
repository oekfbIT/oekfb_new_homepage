import { DateTime } from "luxon";

// The admin API stores Vienna wall-clock fields, usually with a Z suffix.
// Preserve the entered clock time instead of applying another timezone offset.
const matchDate = (value) => DateTime.fromISO(typeof value === "string" ? value : value?.$date || "", { zone: "Europe/Vienna", setZone: true });

export const formatViennaMatchDate = (value) => {
  const date = matchDate(value);
  return date.isValid ? date.toFormat("dd.MM.") : "Ungültiges Datum";
};

export const formatViennaMatchTime = (value) => {
  const date = matchDate(value);
  return date.isValid ? date.toFormat("HH:mm") : "Ungültiges Datum";
};
