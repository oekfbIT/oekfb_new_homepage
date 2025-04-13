import React, { useEffect, useState } from "react";
import "./GalleryCarousel.css";

const GalleryCarousel = ({ sliderdata }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = sliderdata.length;

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 15000); // Auto-slide every 5 seconds
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="carousel-container">
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {sliderdata.map((item, index) => (
          <div className="carousel-slide" key={index}>
            <img
              src={item.image}
              alt={item.description}
            />
            <div className="carousel-caption">
              <h3 className="sub">{item.description}</h3>
              <h2 className="h2">{item.title}</h2>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-button prev" onClick={goToPrevious}>
        ‹
      </button>
      <button className="carousel-button next" onClick={goToNext}>
        ›
      </button>
    </div>
  );
};

export default GalleryCarousel;
