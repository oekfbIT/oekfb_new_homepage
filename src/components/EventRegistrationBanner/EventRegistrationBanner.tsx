import { Link } from "react-router-dom";
import "./style.css";

type EventRegistrationBannerProps = {
  className?: string;
  to?: string;
};

export const EventRegistrationBanner = ({
  className = "",
  to = "/gala-night",
}: EventRegistrationBannerProps): JSX.Element => {
  return (
    <Link
      className={`eventRegistrationBanner ${className}`}
      to={to}
      aria-label="Zur Gala Night Anmeldung"
    >
      <div className="eventRegistrationBanner__content">
        <div className="eventRegistrationBanner__eyebrow">ÖKFB Event</div>
        <h2 className="eventRegistrationBanner__title">Gala Night</h2>
        <p className="eventRegistrationBanner__text">
          Sichere dir deinen Platz für den kommenden ÖKFB Event-Abend.
        </p>
        <span className="eventRegistrationBanner__button">Jetzt anmelden</span>
      </div>

      <div className="eventRegistrationBanner__visual" aria-hidden="true">
        <div className="eventRegistrationBanner__ball" />
        <div className="eventRegistrationBanner__date">EVENT</div>
      </div>
    </Link>
  );
};
