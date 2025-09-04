import React from "react";
import "../style.css";

class SectionTest extends React.Component {
  render() {
   return (
        <div className="section-testimonial">
        <div className="testimonial-top-row">
          <h1>Testimonial</h1>
          <h2>
            What Our Customer Say
            <br />
            About Us
          </h2>
        </div>

        <div className="testimonial-block-row">
          <div className="testimonial-block-item large">
            <div className="rounded-block-large">
              <div className="customer">
                <img src="/Assets/Ellipse 89.svg" alt="customer" />
                <div className="customer-text">
                  <span>Johne Abram</span>
                  <span>SBL Saas Company</span>
                </div>
              </div>
              <p>
                Our website is working well for us. Our website was
                <br />
                developed beautifully by the proxylab team. We really
                <br />
                appreciated the prompt responses and delivery of exactly
                <br />
                what we requested, as per our expectations.
              </p>
            </div>
          </div>

          <div className="testimonial-block-item narrow">
            <img src="/Assets/BTN 2.png" alt="gray button" />
            <img src="/Assets/BTN 1.png" alt="orange button" />
          </div>

          <div className="testimonial-block-item large">
            <img
              src="/Assets/Testimonial element.png"
              alt="people net"
              className="testimonial-block-people"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SectionTest;