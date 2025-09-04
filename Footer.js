import React from "react";
import "../style.css";

class Footer extends React.Component {
  render() {
return (
      <footer>
        <div className="footer-grid">
          <div className="footer-part logo-down">
            <div className="footer-logo">
              <img src="/Assets/Logo.svg" alt="Proxylab Logo" />
              <span>Proxylab</span>
            </div>
            <div className="info">
              <img src="/Assets/Location.svg" alt="Location" />
              <span>Dhaka, Bangladesh</span>
            </div>
            <div className="info">
              <img src="/Assets/Calling.svg" alt="Calling" />
              <span>0943833399</span>
            </div>
            <div className="info">
              <img src="/Assets/Message.svg" alt="Message" />
              <span>support@proxylab.com</span>
            </div>
          </div>

          <div className="footer-part service">
            <h2>Service</h2>
            <ul>
              <li><a href="#">UI UX Design</a></li>
              <li><a href="#">Mobile Design</a></li>
              <li><a href="#">Motion Graphic</a></li>
              <li><a href="#">Web Development</a></li>
              <li><a href="#">Digital Marketing</a></li>
              <li><a href="#">Business Development</a></li>
            </ul>
          </div>

          <div className="footer-part company">
            <h2>Company</h2>
            <ul>
              <li><a href="#">Service</a></li>
              <li><a href="#">Features</a></li>
              <li><a href="#">Our Team</a></li>
              <li><a href="#">Portfolio</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-part media">
            <h2>
              Our Social
              <br />
              Media
            </h2>
            <ul>
              <li><a href="#">Dribbble</a></li>
              <li><a href="#">Behance</a></li>
              <li><a href="#">Medium</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter</a></li>
            </ul>
          </div>

          <div className="footer-part join">
            <h2>Join a Newsletter</h2>
            <span>Your Email</span>
            <form>
              <input
                type="email"
                className="input-field"
                placeholder="Enter your email"
              />
            </form>
            <a href="#">Subscribe</a>
          </div>
        </div>

        <div className="footer-spacer"></div>

        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <span>© 2021 proxylab - All rights reserved.</span>
          </div>
          <nav className="footer-bottom-right">
            <a href="#">Privacy</a>
            <a href="#">Security</a>
            <a href="#">Terms</a>
          </nav>
        </div>
      </footer>
    );
  }
}

export default Footer;