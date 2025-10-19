import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Preloader from "../../components/Preloader/Preloader";
import ItemBanner from "../../components/ItemBanner/ItemBanner";
import ItemContent from "../../components/ItemContent/ItemContent";
import ItemEditForm from "../../components/ItemEditForm/ItemEditForm";

import "./ItemDetails.css";
import "./ItemDetailsAdaptation.css";

import servicesData from "../../data/db.json";

const ItemDetails = () => {
  const { id } = useParams();

  const [services, setServices] = useState([]);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // грузим список
  useEffect(() => {
    setServices(servicesData.services);
  }, []);

  // ищем выбранный элемент
  useEffect(() => {
    const found = services.find((el) => el.id === id);
    setItem(found);
    setLoading(false);
  }, [id, services]);

  const handleUpdate = (updatedItem) => {
    const updated = services.map((el) =>
      el.id === updatedItem.id ? updatedItem : el
    );
    setServices(updated);
    setItem(updatedItem);
    setIsEditing(false);
  };

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

      {isEditing ? (
        <ItemEditForm
          item={item}
          onSave={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <ItemContent item={item} />
      )}

      {!isEditing && (
        <button className="edit-btn" onClick={() => setIsEditing(true)}>
          Edit
        </button>
      )}
    </div>
  );
};

export default ItemDetails;
