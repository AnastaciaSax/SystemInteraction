import React from "react";
import "../style.css";

class SectionWork extends React.Component {
  render() {
   return (
         <div className="section-our-work">
        <div className="top-row">
          <h1>Our Work</h1>
          <h2>See Our Recent Case Studies</h2>
        </div>

        <nav className="nav-row">
          <a href="#">UI/UX</a>
          <a href="#">Development</a>
          <a href="#">Graphic Design</a>
          <a href="#">Motion</a>
          <a href="#">Branding</a>
          <a href="#">Business Development</a>
          <a href="#">Explore all</a>
          <img src="/Assets/arrow.svg" alt="Arrow" />
          <div className="bottom-rectangle"></div>
        </nav>

        <div className="grid-row">
          <div className="grid-item">
            <img src="/Assets/img block 1.jpg" alt="img block 1" />
          </div>
          <div className="grid-item">
            <img src="/Assets/img block 2.jpg" alt="img block 2" />
          </div>
          <div className="grid-item">
            <img src="/Assets/img block 3.jpg" alt="img block 3" />
          </div>
          <div className="grid-item">
            <img src="/Assets/img block 4.jpg" alt="img block 4" />
          </div>
          <div className="grid-item">
            <img src="/Assets/img block 5.jpg" alt="img block 5" />
          </div>
          <div className="grid-item">
            <img src="/Assets/img block 6.jpg" alt="img block 6" />
          </div>
        </div>
      </div>
    );
  }
}

export default SectionWork;