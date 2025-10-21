import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import Preloader from "../../components/Preloader/Preloader";
import ItemBanner from "../../components/ItemBanner/ItemBanner";
import ItemContent from "../../components/ItemContent/ItemContent";
import ItemEditForm from "../../components/ItemEditForm/ItemEditForm";

import {
  fetchServices,
  selectServices,
   selectError,
  selectLoading,
  updateService,
  clearError,
} from "../../slices/servicesSlice";

import "./ItemDetails.css";
import "./ItemDetailsAdaptation.css";

const ItemDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();

  const services = useSelector(selectServices);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [isEditing, setIsEditing] = useState(false);
  const [item, setItem] = useState(null);

  // загружаем сервисы
  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);
  
      useEffect(() => {
      if (error) {
        alert(error);
        dispatch(clearError());
      }
    }, [error, dispatch]);
  

  // находим текущий элемент после загрузки
  useEffect(() => {
    const found = services.find((el) => el.id === id);
    setItem(found);
  }, [id, services]);

  const handleUpdate = (updatedItem) => {
    dispatch(updateService(updatedItem));
    setIsEditing(false);
  };

  if (loading) return <Preloader />;

  if (!item) {
    return (
      <div className="not-found-message">
        <p>{t("itemNotFound")}</p>
        <Link to="/catalog">{t("backToCatalog")}</Link>
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
          {t("editServiceTitle")}
        </button>
      )}
    </div>
  );
};

export default ItemDetails;
