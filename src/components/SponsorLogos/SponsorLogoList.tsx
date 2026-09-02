import React from "react";
import { SponsorRecord } from "../../context/SponsorContext";

interface Props {
  items: SponsorRecord[];
  listClassName: string;
  logoClassName: string;
  loading: boolean;
}

export const SponsorLogoList = ({
  items,
  listClassName,
  logoClassName,
  loading,
}: Props): JSX.Element => (
  <div className={listClassName} aria-busy={loading}>
    {loading && <span className="sponsor-logo-status">Logos werden geladen …</span>}
    {!loading && items.map((item) => (
      <a
        key={item.id}
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${item.name} (öffnet in neuem Tab)`}
      >
        <img
          className={logoClassName}
          alt={item.name}
          loading="lazy"
          src={item.logo}
        />
      </a>
    ))}
  </div>
);
