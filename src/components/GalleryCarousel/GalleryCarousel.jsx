import { useEffect, useState } from "react";
import "./GalleryCarousel.css";

const GalleryCarousel = ({ sliderdata }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = sliderdata.length;

  const goToPrevious = () =>
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));

  const goToNext = () =>
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));

  useEffect(() => {
    const interval = setInterval(goToNext, 15000);
    return () => clearInterval(interval);
  }, [currentIndex, totalSlides]);

  return (
    <div className="carousel-wrapper">
      <div className="carousel-container">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {sliderdata.map((item, index) => (
            <div className="carousel-slide" key={index}>
              <div className="carousel-image-wrapper">
                <img src={item.image} alt={item.description} />
              </div>
              <div className="carousel-caption">
                <h3 className="header">{item.description}</h3>
                <h2 className="pRousel">{item.title}</h2>
              </div>
            </div>
          ))}
        </div>
        {totalSlides > 1 && (
          <>
            <button className="carousel-button prev" onClick={goToPrevious}>
              ‹
            </button>
            <button className="carousel-button next" onClick={goToNext}>
              ›
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default GalleryCarousel;
