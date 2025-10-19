import React from "react";

import "./ContactSection.css";

const ContactSection = () => {
  return (
    <div className="wanna-contact">
      <div className="wanna-content">
        <div className="content-text">
          <h2>Wanna Contact Us?</h2>
          <p>
            We're always happy to hear from fellow design enthusiasts. Whether
            it's a quick hello or a spark of a new idea, drop us a message
            anytime, and let's chat about making your space truly special.
          </p>
        </div>
        <div className="content-contact">
          <div className="contact">
            <img src="/Assets/mail.svg" alt="Mail icon" />
            <span>interno@gmail.com</span>
          </div>
          <div className="contact">
            <img src="/Assets/phone.svg" alt="Phone icon" />
            <span>+1 (378) 400-1234</span>
          </div>
          <div className="contact">
            <img src="/Assets/site.svg" alt="Web site icon" />
            <span>www.interno.com</span>
          </div>
        </div>
      </div>
    <div className="map-container">
        <div id="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.9363747399586!2d-73.98502118459355!3d40.69057257933426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a30f4a8ea9d%3A0x7ec99e56c8d3b169!2sLong%20Island%20University%20Brooklyn!5e0!3m2!1sen!2sus!4v1682355282600!5m2!1sen!2sus"
            className="map-embed"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactSection;