import React from "react";
import "../style.css";

class Agency extends React.Component {
  render() {
   return (
       <div className="agency">
            <div className="clients">
                <span>OUR TRUSTED CLIENTS</span>
                <img src="/Assets/Company.png" alt="Company logos"/>
            </div>
        </div>
    );
  }
}

export default Agency;