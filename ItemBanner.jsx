import React from "react";

const ItemBanner = ({ title }) => (
  <main className="banner  banner--item">
    <div className="intro">
      <div className="into-title">
        <h2>{title}</h2>
        <span>Home / Catalog / {title}</span>
      </div>
    </div>
  </main>
);

export default ItemBanner;