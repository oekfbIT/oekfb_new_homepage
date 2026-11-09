import { DateTime } from "luxon";

const matchDate = (value) => DateTime.fromISO(typeof value === "string" ? value : value?.$date || "", { zone: "Europe/Vienna" });

export const formatViennaMatchDate = (value) => {
  const date = matchDate(value);
  return date.isValid ? date.toFormat("dd.MM.") : "Ungültiges Datum";
};

export const formatViennaMatchTime = (value) => {
  const date = matchDate(value);
  return date.isValid ? date.toFormat("HH:mm") : "Ungültiges Datum";
};
