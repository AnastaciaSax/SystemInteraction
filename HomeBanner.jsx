import React from "react";

function HomeBanner() {
  return (
    <main className="banner banner--home">
      <div className="banner-intro">
        <div className="banner-intro-text">
          <h2>Let Your Home Be Unique</h2>
          <p>Our design experts blend modern creativity with timeless elegance, crafting spaces that truly reflect your personality.</p>
          <p>Discover a new way to experience home design, where innovation meets practicality and every room tells your unique story.</p>
        </div>
        <button className="banner-but">
          <div className="get-started">
            <a href="/catalog">Get Started</a>
            <img src="/Assets/arrowButton.svg" alt="Arrow"/>
          </div>
        </button>
      </div>
    </main>
  );
}

export default HomeBanner;