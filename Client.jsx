import React from "react";

import "./Client.css";

const testimonials = [
  {
    img: "/Assets/person.png",
    name: "Nattasha Mith",
    location: "Sydney, USA",
    text: "I was absolutely thrilled with the transformation of my living space. Their keen eye for aesthetics and thoughtful approach."
  },
  {
    img: "/Assets/person1.png",
    name: "Raymond Galario",
    location: "Sydney, Australia",
    text: "The team listened to my ideas, then elevated them with innovative design solutions. My apartment now feels modern, uniquely mine."
  },
  {
    img: "/Assets/person2.png",
    name: "Benny Roll",
    location: "Sydney, New York",
    text: "Choosing this company was the best decision. The blend of creativity and expertise transformed my outdated space."
  },
];

const logos = [
  "/Assets/clientLogo.svg",
  "/Assets/clientLogo1.svg",
  "/Assets/clientLogo2.svg",
  "/Assets/clientLogo3.svg",
  "/Assets/clientLogo4.svg",
];

const Client = () => (
  <div className="client-section">
    {/* Testimonials */}
    <div className="testimonial">
      <div className="testimonial-content">
        <div className="content-head">
          <h2>What the People Think About Us</h2>
        </div>
        <div className="content-comment">
          {testimonials.map((t, i) => (
            <div className="comment" key={i}>
              <div className="person">
                <img src={t.img} alt="Person's photo" />
                <div className="person-info">
                  <h3>{t.name}</h3>
                  <span>{t.location}</span>
                </div>
              </div>
              <div className="comment-text">
                <p>{t.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Client Logos */}
    <div className="client-logo">
      {logos.map((src, i) => (
        <img key={i} src={src} alt="Client logo" />
      ))}
    </div>
  </div>
);

export default Client;