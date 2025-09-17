import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header-container">
    <header>
      <div className="logo">
        <img src="/Assets/Logo.png" alt="Logo" />
        <h1>Interno</h1>
      </div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/team">Team</Link>
        <Link to="/catalog">Catalog</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/checkIn">Check In</Link>
        <Link to="/signIn">Sign In</Link>
        <Link to="/options" className="optionBut">
          <img src="/Assets/optionsIcon.svg" alt="Options" />
        </Link>
      </nav>
      <div className="burger">
        <button className="burger-toggle">
          <img src="/Assets/hamburger.svg" alt="Menu" />
        </button>
        <div className="burger-menu">
          <Link to="/">Home</Link>
          <Link to="/team">Team</Link>
          <Link to="/catalog">Catalog</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/checkIn">Check In</Link>
          <Link to="/signIn">Sign In</Link>
          <Link to="/options">Options</Link>
        </div>
      </div>
    </header>
    </div>
  );
}

export default Header;
