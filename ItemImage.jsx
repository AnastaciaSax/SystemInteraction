import React from "react";

const ItemImage = ({ src, alt }) => (
  <div className="details-pic">
    <img src={src} alt={alt} />
  </div>
);

export default ItemImage;
