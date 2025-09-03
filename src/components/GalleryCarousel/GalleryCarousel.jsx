// GalleryCarousel.jsx
// -------------------------------------------------------------
// A responsive, auto-playing carousel for hero/gallery images.
//
// Accessibility:
// - Uses buttons with aria-labels
// - Slides are focusable via the buttons; track uses transform only
//
// Styling:
// - See GalleryCarousel.css
// - Typography/colors use tokens from global.css
// - Class names are BEM-ish: .carousel, .carousel__track, etc.
// -------------------------------------------------------------

import { useEffect, useMemo, useState } from "react";
import "./GalleryCarousel.css";

const AUTOPLAY_MS = 15000;

const GalleryCarousel = ({ sliderdata = [] }) => {
  // Normalize incoming data (strip null/undefined)
  const slides = useMemo(() => sliderdata.filter(Boolean), [sliderdata]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = slides.length;

  // Navigation handlers
  const goToPrevious = () =>
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));

  const goToNext = () =>
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));

  // Reset index if slide count shrinks
  useEffect(() => {
    if (currentIndex > totalSlides - 1) setCurrentIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalSlides]);

  // Autoplay when there are 2+ slides
  useEffect(() => {
    if (totalSlides <= 1) return;
    const id = setInterval(goToNext, AUTOPLAY_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalSlides]);

  if (totalSlides === 0) return null;

  return (
    <section className="carousel" aria-roledescription="carousel">
      <div className="carousel__viewport">
        <div
          className="carousel__track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((item, index) => {
            const title = item.title;
            const subtitle = item.description;
            const alt =
              item.description || item.title || `Slide ${index + 1}`;

            return (
              <article className="carousel__slide" key={item.id ?? index}>
                <div className="carousel__media">
                  <img className="carousel__img" src={item.image} alt={alt} />
                </div>

                {(title || subtitle) && (
                  <div className="carousel__caption">
                    {subtitle && (
                      <h3 className="h2">{subtitle}</h3>
                    )}
                    {title && (
                      <h2 className="p">{title}</h2>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {totalSlides > 1 && (
          <>
            <button
              className="carousel__btn carousel__btn--prev"
              onClick={goToPrevious}
              aria-label="Vorherige Folie"
              type="button"
            >
              ‹
            </button>
            <button
              className="carousel__btn carousel__btn--next"
              onClick={goToNext}
              aria-label="Nächste Folie"
              type="button"
            >
              ›
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default GalleryCarousel;
