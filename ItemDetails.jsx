import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Preloader from "../components/Preloader";
import ItemBanner from "../components/ItemBanner";
import ItemContent from "../components/ItemContent";
import "../styles/ItemDetails.css";
import "../styles/ItemDetailsAdaptation.css";

import servicesData from "../data/db.json";

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const found = servicesData.services.find((el) => el.id === id);
  setItem(found);
  setLoading(false);
}, [id]);

  if (loading) return <Preloader />;

  if (!item) {
    return (
      <div className="not-found-message">
        <p>Item not found</p>
        <Link to="/catalog">Back to catalog</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <ItemBanner title={item.title} />
      <ItemContent item={item} />
    </div>
  );
};

export default ItemDetails;
