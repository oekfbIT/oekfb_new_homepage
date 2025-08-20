import { useEffect, useMemo, useState } from "react";
import "./GalleryCarousel.css";

const GalleryCarousel = ({ sliderdata = [] }) => {
  const slides = useMemo(
    () => sliderdata.filter(Boolean),
    [sliderdata]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = slides.length;

  const goToPrevious = () =>
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));

  const goToNext = () =>
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));

  // Reset index if the number of slides changes
  useEffect(() => {
    if (currentIndex > totalSlides - 1) setCurrentIndex(0);
  }, [totalSlides]); // eslint-disable-line react-hooks/exhaustive-deps

  // Stable interval: only run when there's something to slide
  useEffect(() => {
    if (totalSlides <= 1) return; // no autoplay for 0/1 slides
    const id = setInterval(goToNext, 15000);
    return () => clearInterval(id);
    // depend on totalSlides so it restarts if the list size changes
  }, [totalSlides]); // eslint-disable-line react-hooks/exhaustive-deps

  if (totalSlides === 0) return null;

  return (
    <div className="carousel-wrapper">
      <div className="carousel-container">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((item, index) => (
            <div className="carousel-slide" key={item.id ?? index}>
              <div className="carousel-image-wrapper">
                <img
                  src={item.image}
                  alt={item.description || item.title || `Slide ${index + 1}`}
                />
              </div>
              {(item.title || item.description) && (
                <div className="carousel-caption">
                  {item.description && <h3 className="header">{item.description}</h3>}
                  {item.title && <h2 className="pRousel">{item.title}</h2>}
                </div>
              )}
            </div>
          ))}
        </div>

        {totalSlides > 1 && (
          <>
            <button className="carousel-button prev" onClick={goToPrevious} aria-label="Previous slide">
              ‹
            </button>
            <button className="carousel-button next" onClick={goToNext} aria-label="Next slide">
              ›
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default GalleryCarousel;
