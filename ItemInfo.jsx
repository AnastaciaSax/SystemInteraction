import React from "react";
import { Link } from "react-router-dom";

const ItemInfo = ({ title, category, price, place }) => (
  <div className="details-info">
    <h3>{title}</h3>
    <p className="details-category">Category: {category}</p>
    <p className="details-place">Place: {place}</p>
    <p className="details-price">Price: ${price}</p>

    <div className="catalog-butt">
      <Link to="/catalog">
← Back to Catalog
      </Link>
    </div>
  </div>
);

export default ItemInfo;