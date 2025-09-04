import React from "react";
import "../style.css";

class SectionAbout extends React.Component {
  render() {
   return (
         <div className="section-about-us">
        <div className="section-about-us-left">
          <h1>About Us</h1>
          <h2>
            We're More Than Digital
            <br />
            Agency in the World
          </h2>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit of the voluptatem
            <br />
            accusantium lorem sit doloremque, totam rem aperiam, eaque ipsa
            <br />
            quae ab illo invento veritatis quasi architecto beatae vitae dicta.
          </p>
          <a href="#">Get in touch</a>
        </div>

        <div className="section-about-us-right">
          <img src="/Assets/man.png" alt="Man" />
        </div>
      </div>
    );
  }
}

export default SectionAbout;