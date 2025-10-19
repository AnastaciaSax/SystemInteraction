import React from "react";

import "./JoinSection.css";

const JoinSection = () => (
  <div className="wanna-join">
    <div className="wanna-join-content">
      <div className="wanna-join-content-head">
        <h2>Wanna Join The Interno?</h2>
        <p>It's your gateway to a community where creativity and collaboration thrive.</p>
      </div>
      <div className="wanna-join-content-but">
        <button className="content-but">
          <div className="but-text">
            <a href="checkIn.html">Check In</a>
            <img src="/Assets/butArrow.svg" alt="Button arrow" />
          </div>
        </button>
        <button className="content-but">
          <div className="but-text">
            <a href="signIn.html">Sign In</a>
            <img src="/Assets/butArrow.svg" alt="Button arrow" />
          </div>
        </button>
      </div>
    </div>
  </div>
);

export default JoinSection;