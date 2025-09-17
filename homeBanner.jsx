import React from "react";
import { Link } from "react-router-dom";

function homeBanner() {
  return (
    <main className="banner">
      <div className="banner-intro">
        <div className="banner-intro-text">
          <h2>Let Your Home Be Unique</h2>
          <p>Our design experts blend modern creativity with timeless elegance, crafting spaces that truly reflect your personality.</p>
          <p>Discover a new way to experience home design, where innovation meets practicality and every room tells your unique story.</p>
        </div>
        <button className="banner-but">
          <div className="get-started">
            <Link to="/catalog">Get Started</Link>
            <img src="/assets/arrowButton.svg" alt="Arrow"/>
          </div>
        </button>
      </div>
    </main>
  );
}

export default homeBanner;