import { formatViennaMatchDate, formatViennaMatchTime } from "./viennaMatchDate.mjs";

export type ISODate = string | { $date: string };

export { normalizeDate, HALF_DURATION_MINUTES, getElapsedTime, getMatchStatusText } from "./liveMatchClock.mjs";

export const formatMatchDate = (dateValue: ISODate): string => {
  return formatViennaMatchDate(dateValue);
};

export const formatMatchTime = (dateValue: ISODate): string => {
  return formatViennaMatchTime(dateValue);
};
