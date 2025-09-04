import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="logo">
          <img src="/Assets/Logo.svg" alt="Logo" />
          <div className="logo-text">Proxylab</div>
        </div>
        <nav className="nav">
          <a href="#">Features</a>
          <a href="#">Pricing & Plans</a>
          <a href="#">Support</a>
          <a href="#">About Us</a>
          <div className="contact-us">
            <a href="#">Contact Us</a>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;