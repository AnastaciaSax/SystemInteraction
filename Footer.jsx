import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="interno">
        <div className="interno-info">
          <div className="interno-info-text">
            <div className="logo">
              <img src="/assets/Logo.png" alt="Logo" />
              <h1>Interno</h1>
            </div>
            <p>"Design Your Dream, Live Your Vision"<br/>We create interiors that are an extension of your unique story.</p>
          </div>
          <div className="interno-info-media">
            <img src="/assets/media.png" alt="Media icon"/>
            <img src="/assets/meadia1.png" alt="Media icon"/>
            <img src="/assets/meadia2.png" alt="Media icon"/>
            <img src="/assets/meadia3.png" alt="Media icon"/>
          </div>
        </div>
        <div className="interno-page">
          <h3>Pages</h3>
          <Link to="/">Home</Link>
          <Link to="/catalog">Catalog</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/team">Team</Link>
          <Link to="/options">Options</Link>
        </div>
        <div className="interno-service">
          <h3>Services</h3>
          <Link to="/catalog?category=Kitchen">Kitchen</Link>
          <Link to="/catalog?category=Living%20Room">Living Room</Link>
          <Link to="/catalog?category=Bathroom">Bathroom</Link>
          <Link to="/catalog?category=Dining%20Hall">Dining Hall</Link>
          <Link to="/catalog?category=Bedroom">Bedroom</Link>
        </div>
        <div className="interno-contact">
          <h3>Contact</h3>
          <div className="interno-contact-data">
            <span>55 East Birchwood Ave. Brooklyn, New York 11201</span>
            <span>interno@gmail.com</span>
            <span>(123) 456 - 7890</span>
          </div>
        </div>
      </div>
      <div className="copyright">
        <div className="copyright-line"></div>
        <span>Copyright © Interno | Designed by Anastacia Sax</span>
      </div>
    </footer>
  );
}

export default Footer;