import { useEffect, useState } from "react";
import { getMatchStatusText, ISODate } from "../utils/matchUtils";

export const useMatchStatusText = (
  status: string,
  firstHalfDate?: ISODate,
  secondHalfDate?: ISODate,
  fallbackFormattedDate?: string
): string => {
  const [, refresh] = useState(0);

  useEffect(() => {
    if (status !== "first" && status !== "second") return;
    // Force a render even if a timestamp is missing or the minute hasn't changed.
    const interval = setInterval(() => refresh((tick) => tick + 1), 1000);
    return () => clearInterval(interval);
  }, [status]);

  return getMatchStatusText(status, firstHalfDate, secondHalfDate, fallbackFormattedDate);
};
