import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./ItemDetails.css"; 

const ItemEditForm = ({ item, onSave, onCancel }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(item);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{t("editServiceTitle")}</h2>
        <form className="edit-form" onSubmit={handleSubmit}>
          <label>
            {t("titlePlaceholder")}:
            <input name="title" value={formData.title} onChange={handleChange} />
          </label>
          <label>
            {t("categoryPlaceholder")}:
            <input name="category" value={formData.category} onChange={handleChange} />
          </label>
          <label>
            {t("placeLabel")}:
            <input name="place" value={formData.place} onChange={handleChange} />
          </label>
          <label>
            {t("pricePlaceholder")}:
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </label>
          <div className="edit-form-buttons">
            <button type="submit" className="edit-btn">{t("saveButton")}</button>
            <button type="button" className="edit-btn" onClick={onCancel}>{t("cancelButton")}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemEditForm;
