import React from "react";
import "../style.css";

class SectionService extends React.Component {
  render() {
   return (
      <div className="section-service">
        <div className="section-service-left">
          <h1>What we do</h1>
          <div className="h2-container">
            <h2>
              We Are Here To Help You
              <br />
              Build Your Business
            </h2>
            <img src="/Assets/rocket.png" alt="Rocket" />
          </div>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit of the voluptatem
            <br />
            accusantium lorem sit doloremque, totam rem aperiam, eaque ipsa
            <br />
            quae ab illo invento veritatis quasi architecto beatae vitae dicta.
          </p>
          <a href="#">Explore all service</a>
        </div>

        <div className="section-service-right">
          <div className="service-grid-item">
            <img src="/Assets/Digital.png" alt="Digital logo" />
            <h1>Digital Marketing</h1>
            <p>
              That is the simply dummy text the
              <br />
              printing and typesetting industry.
            </p>
            <a href="#">Read more</a>
          </div>

          <div className="service-grid-item">
            <img src="/Assets/SEO.png" alt="SEO logo" />
            <h1>SEO</h1>
            <p>
              That is the simply dummy text the
              <br />
              printing and typesetting industry.
            </p>
            <a href="#">Read more</a>
          </div>

          <div className="service-grid-item">
            <img src="/Assets/UI.svg" alt="UI logo" />
            <h1>UI UX Design</h1>
            <p>
              That is the simply dummy text the
              <br />
              printing and typesetting industry.
            </p>
            <a href="#">Read more</a>
            <div className="rounded-rectangle"></div>
          </div>

          <div className="service-grid-item">
            <img src="/Assets/web.svg" alt="Web logo" />
            <h1>Web Development</h1>
            <p>
              That is the simply dummy text the
              <br />
              printing and typesetting industry.
            </p>
            <a href="#">Read more</a>
          </div>
        </div>
      </div>
    );
  }
}

export default SectionService;