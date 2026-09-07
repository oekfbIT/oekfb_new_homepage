import "./style.css";

const APP_STORE_BADGE =
  "https://www.bundesliga.com/assets/badges/apple_app_store_badge.svg";

const GOOGLE_PLAY_BADGE =
  "https://www.bundesliga.com/assets/badges/google_play_badge.svg";

const STORE_LINKS = [
  {
    label: "Download on the App Store",
    href: "https://apps.apple.com/it/app/%C3%B6kfb/id6756211638",
    badge: APP_STORE_BADGE,
  },
  {
    label: "Get it on Google Play",
    href: "https://play.google.com/store/apps/details?id=com.oekfb.app",
    badge: GOOGLE_PLAY_BADGE,
  },
];

type StoreBadgesProps = {
  className?: string;
};

export const StoreBadges = ({ className = "" }: StoreBadgesProps): JSX.Element => (
  <div className={`storeBadges ${className}`} role="group" aria-label="App download links">
    {STORE_LINKS.map((store) => (
      <a
        key={store.href}
        className="storeBadges__link"
        href={store.href}
        target="_blank"
        rel="noreferrer"
        aria-label={`${store.label} (öffnet in neuem Tab)`}
      >
        <img className="storeBadges__image" src={store.badge} alt={store.label} loading="lazy" />
      </a>
    ))}
  </div>
);
