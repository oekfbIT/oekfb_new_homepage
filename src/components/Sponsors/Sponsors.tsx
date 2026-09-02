// Sponsors.tsx
// -------------------------------------------------------------
// Sponsors strip (title + row of logos).
// - Layout preserved 1:1 with your current version
// - Semantic class names (BEM-ish) + global tokens
// - Accessibility: descriptive alt, noopener, lazy imgs
// -------------------------------------------------------------

import { SponsorLogoList } from "../SponsorLogos/SponsorLogoList";
import { useSponsorRecords } from "../../context/SponsorContext";
import "./style.css";

type Props = {
  className?: string;
  /** optional extra class for the container (kept for back-compat) */
  sponsorsContainerClassName?: string;
};

export function Sponsors({
  className = "",
  sponsorsContainerClassName = "",
}: Props): JSX.Element | null {
  const { items, loading } = useSponsorRecords("sponsor");

  if (items.length === 0) return null;

  return (
    <section className={`sponsors ${className}`} aria-label="ÖKFB Sponsoren">
      <div className={`sponsors__panel ${sponsorsContainerClassName}`}>
        {/* Title line: OFFIZIELLE SPONSOREN DES ÖKFB */}
        <p className="sponsors__title">
          <span className="sponsors__titlePart">OFFIZIELLE</span>
          <span className="sponsors__titleHighlight">SPONSOREN</span>
          <span className="sponsors__titlePart"> DES ÖKFB</span>
        </p>

        <SponsorLogoList
          items={items}
          loading={loading}
          listClassName="sponsors__list"
          logoClassName="sponsors__logo"
        />
      </div>
    </section>
  );
}

export default Sponsors;
