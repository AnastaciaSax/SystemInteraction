import React from "react";
import ItemImage from "../ItemImage/ItemImage";
import ItemInfo from "../ItemInfo/ItemInfo";

import "./ItemContent.css";

const ItemContent = ({ item }) => (
  <div className="project">
    <div className="field">
      <div className="details-card">
        <ItemImage src={item.photoURL} alt={item.title} />
        <ItemInfo
          title={item.title}
          category={item.category}
          price={item.price}
          place={item.place}
        />
      </div>
    </div>
  </div>
);

export default ItemContent;
