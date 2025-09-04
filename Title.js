import React from "react";
import "../style.css";

class Title extends React.Component {
  render() {
    return (
        <>
      <main className="title">
        <div className="title-text">
          <span className="title-best-marketing">
            Best <span className="title-marketing">Marketing</span>
          </span>
          <br />
          <span className="title-digital-agency">Digital Agency</span>
          <p>
            Various versions have evolved over the years, <br />
            sometimes by accident, sometimes on purpose
          </p>
        </div>

        <div className="title-decoration">
          <img src="/Assets/Shape.png" alt="Decoration" />
        </div>

        <div className="happy-girl">
          <img src="/Assets/Happy Girl.png" alt="Happy girl" />
        </div>
      </main>
              <div className="main-button">
          <a className="get-started" href="#">
            Get Started
          </a>
          <img src="/Assets/icon.svg" alt="Video icon" />
          <a href="#">Watch Video</a>
        </div>
      </>
    );
  }
}

export default Title;