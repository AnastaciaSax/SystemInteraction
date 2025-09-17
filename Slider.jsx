import React from "react";
import { Link } from "react-router-dom";

function Slider() {
  const slides = [
    { src: "/assets/bed1.png", category: "Bedroom" },
    { src: "/assets/kitchen1.jpg", category: "Kitchen" },
    { src: "/assets/bath1.jpg", category: "Bathroom" },
    { src: "/assets/bed5.jpg", category: "Bedroom" },
    { src: "/assets/kitchen2.jpg", category: "Kitchen" },
    { src: "/assets/dining1.jpg", category: "Dining%20Hall" },
  ];

  return (
    <div className="slider">
      <h2>What We Offer</h2>
      <div className="slides">
        {slides.map((slide, i) => (
          <div key={i} className="slide">
            <Link to={`/catalog?category=${slide.category}`}>
              <img src={slide.src} alt={slide.category} />
            </Link>
          </div>
        ))}
      </div>
      <div className="slider-but">
        <button className="prev"><img src="/assets/arrowPrev.svg" alt="Previous"/></button>
        <button className="next"><img src="/assets/arrowNext.svg" alt="Next"/></button>
      </div>
    </div>
  );
}

export default Slider;