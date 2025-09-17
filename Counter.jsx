import React from "react";

const counters = [
  { number: 12, label: "Years Of Experience" },
  { number: 85, label: "Successful Projects" },
  { number: 15, label: "Active Projects" },
  { number: 95, label: "Happy Customers" },
];

const Counter = () => (
  <div className="counter">
    <div className="counter-digit">
      {counters.map((c, i) => (
        <React.Fragment key={i}>
          <div className="digit">
            <h3>{c.number}</h3>
            <span>{c.label}</span>
          </div>
          {i < counters.length - 1 && <div className="counter-line"></div>}
        </React.Fragment>
      ))}
    </div>
  </div>
);

export default Counter;