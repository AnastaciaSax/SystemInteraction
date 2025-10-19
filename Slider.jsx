import React from "react";
import { Link } from "react-router-dom";

import "./Slider.css";

function Slider() {
  const slides = [
    { src: "/Assets/bed1.png", category: "Bedroom" },
    { src: "/Assets/kitchen1.jpg", category: "Kitchen" },
    { src: "/Assets/bath1.jpg", category: "Bathroom" },
    { src: "/Assets/bed5.jpg", category: "Bedroom" },
    { src: "/Assets/kitchen2.jpg", category: "Kitchen" },
    { src: "/Assets/dining1.jpg", category: "Dining%20Hall" },
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
        <button className="prev"><img src="/Assets/arrowPrev.svg" alt="Previous"/></button>
        <button className="next"><img src="/Assets/arrowNext.svg" alt="Next"/></button>
      </div>
    </div>
  );
}

export default Slider;