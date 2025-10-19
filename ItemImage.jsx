import React from "react";

import "./ItemImage.css";

const ItemImage = ({ src, alt }) => (
  <div className="details-pic">
    <img src={src} alt={alt} />
  </div>
);

export default ItemImage;
