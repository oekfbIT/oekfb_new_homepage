export type ISODate = string | { $date: string };

export const normalizeDate = (value?: ISODate): string | null => {
  if (!value) return null;
  if (typeof value === "string") return value;
  if (typeof value === "object" && "$date" in value) return value["$date"];
  return null;
};

export const getViennaNow = (): Date => {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Vienna",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
    .formatToParts(new Date())
    .reduce((acc: Record<string, string>, part) => {
      if (part.type !== "literal") acc[part.type] = part.value;
      return acc;
    }, {});

  return new Date(
    Date.UTC(
      parseInt(parts.year),
      parseInt(parts.month) - 1,
      parseInt(parts.day),
      parseInt(parts.hour),
      parseInt(parts.minute),
      parseInt(parts.second)
    )
  );
};

export const getElapsedTime = (
  startTime: ISODate | undefined,
  offsetMinutes = 0
): string => {
  const startDateStr = normalizeDate(startTime);
  if (!startDateStr) return "0'";
  const start = new Date(startDateStr).getTime();
  const now = getViennaNow().getTime();
  const diff = Math.floor((now - start) / 60000);
  const total = diff + offsetMinutes;
  return !isNaN(total) && total >= 0 ? `${total}'` : "0'";
};

export const formatMatchDate = (dateValue: ISODate): string => {
  const dateStr = normalizeDate(dateValue)?.replace(/Z$/, "");
  const date = new Date(dateStr || "");
  if (isNaN(date.getTime())) return "Ungültiges Datum";

  const parts = new Intl.DateTimeFormat("de-DE", {
    timeZone: "Europe/Vienna",
    day: "2-digit",
    month: "2-digit",
  }).formatToParts(date);

  const day = parts.find((p) => p.type === "day")?.value;
  const month = parts.find((p) => p.type === "month")?.value;

  return `${day}.${month}.`;
};

export const formatMatchTime = (dateValue: ISODate): string => {
  const dateStr = normalizeDate(dateValue)?.replace(/Z$/, "");
  const date = new Date(dateStr || "");
  if (isNaN(date.getTime())) return "Ungültiges Datum";

  const parts = new Intl.DateTimeFormat("de-DE", {
    timeZone: "Europe/Vienna",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const hour = parts.find((p) => p.type === "hour")?.value;
  const minute = parts.find((p) => p.type === "minute")?.value;

  return `${hour}:${minute}`;
};

export const getMatchStatusText = (
  status: string,
  firstHalfDate?: ISODate,
  secondHalfDate?: ISODate,
  fallbackFormattedDate?: string
): string => {
  switch (status) {
    case "pending":
      return "Spielvorschau";
    case "first":
      return firstHalfDate
        ? `LIVE - 1. HB: ${getElapsedTime(firstHalfDate, 0)}`
        : fallbackFormattedDate || "";
    case "second":
      return secondHalfDate
        ? `LIVE - 2. HB: ${getElapsedTime(secondHalfDate, 25)}`
        : fallbackFormattedDate || "";
    case "halftime":
      return "Halbzeit";
    case "completed":
    case "submitted":
    case "done":
      return "Spiel Abgeschlossen";
    case "abgebrochen":
      return "Spiel Abgebrochen";
    case "cancelled":
      return "Spiel Abgesagt";
    default:
      return fallbackFormattedDate || "";
  }
};
