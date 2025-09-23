import React, { useState } from "react";
import "../styles/ItemDetails.css"; 

const ItemEditForm = ({ item, onSave, onCancel }) => {
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
        <h2>Edit Service</h2>
        <form className="edit-form" onSubmit={handleSubmit}>
          <label>
            Title:
            <input name="title" value={formData.title} onChange={handleChange} />
          </label>
          <label>
            Category:
            <input name="category" value={formData.category} onChange={handleChange} />
          </label>
          <label>
            Place:
            <input name="place" value={formData.place} onChange={handleChange} />
          </label>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </label>
          <div className="edit-form-buttons">
            <button type="submit" className="edit-btn">Save</button>
            <button type="button" className="edit-btn" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemEditForm;