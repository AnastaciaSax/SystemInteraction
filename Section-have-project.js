import React from "react";
import "../style.css";

class SectionProject extends React.Component {
  render() {
   return (
        <div className="section-have-project">
        <div className="section-have-project-space"></div>
        <div className="section-have-project-rounded-block">
          <h2>
            Have A Project In Mind?
            <br />
            Let's Get To Work.
          </h2>
          <a href="#">Get in touch</a>
        </div>
        <img
          src="/Assets/serious-man-thinking 1.png"
          alt="man-thinking"
        />
      </div>
    );
  }
}

export default SectionProject;