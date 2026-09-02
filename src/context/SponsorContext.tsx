import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import ClientController from "../network/ClientController";

export type SponsorType = "sponsor" | "partner";

export interface SponsorRecord {
  id: string;
  name: string;
  link: string;
  logo: string;
  type: SponsorType;
  position?: number;
}

interface SponsorContextValue {
  items: SponsorRecord[];
  loading: boolean;
  error: string;
}

const SponsorContext = createContext<SponsorContextValue>({
  items: [],
  loading: true,
  error: "",
});

const controller = new ClientController();

export const SponsorProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [items, setItems] = useState<SponsorRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    controller.fetchSponsors()
      .then((response: unknown) => {
        if (active) setItems(Array.isArray(response) ? response as SponsorRecord[] : []);
      })
      .catch((requestError: unknown) => {
        if (!active) return;
        setError(requestError instanceof Error ? requestError.message : "Sponsoren konnten nicht geladen werden.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(() => ({ items, loading, error }), [items, loading, error]);
  return <SponsorContext.Provider value={value}>{children}</SponsorContext.Provider>;
};

export const useSponsorRecords = (type?: SponsorType): SponsorContextValue => {
  const context = useContext(SponsorContext);
  return {
    ...context,
    items: type ? context.items.filter((item) => item.type === type) : context.items,
  };
};
