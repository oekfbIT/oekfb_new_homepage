// Partners.tsx
// -------------------------------------------------------------
// OFFIZIELLE PARTNER DES ÖKFB
// - Layout preserved 1:1 from your original
// - BEM-ish class names + global tokens
// - A11y: aria-labels, noopener, lazy images
// -------------------------------------------------------------

import { SponsorLogoList } from "../SponsorLogos/SponsorLogoList";
import { useSponsorRecords } from "../../context/SponsorContext";
import "./style.css";

type Props = {
  className?: string;
  sponsorsContainerClassName?: string; // kept for back-compat
};

export function Partners({
  className = "",
  sponsorsContainerClassName = "",
}: Props): JSX.Element | null {
  const { items, loading } = useSponsorRecords("partner");

  if (items.length === 0) return null;

  return (
    <section className={`partners ${className}`} aria-label="ÖKFB Partner">
      <div className={`partners__panel ${sponsorsContainerClassName}`}>
        {/* Title */}
        <p className="partners__title">
          <span className="partners__titlePart">OFFIZIELLE </span>
          <span className="partners__titleHighlight">PARTNER</span>
          <span className="partners__titlePart"> DES ÖKFB</span>
        </p>

        <SponsorLogoList
          items={items}
          loading={loading}
          listClassName="partners__list"
          logoClassName="partners__logo"
        />
      </div>
    </section>
  );
}

export default Partners;
