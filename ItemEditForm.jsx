import React, { useState } from "react";
import { Box, InputBase } from "@mui/material";
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
    <Box className="modal-overlay">
      <Box className="modal-content">
        <h2>Edit Service</h2>
        <form className="edit-form" onSubmit={handleSubmit}>
          <label>
            Title:
            <InputBase
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
            />
          </label>
          <label>
            Category:
            <InputBase
              name="category"
              value={formData.category}
              onChange={handleChange}
              fullWidth
            />
          </label>
          <label>
            Place:
            <InputBase
              name="place"
              value={formData.place}
              onChange={handleChange}
              fullWidth
            />
          </label>
          <label>
            Price:
            <InputBase
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              fullWidth
            />
          </label>
          <Box className="edit-form-buttons">
            <button type="submit" className="edit-btn">Save</button>
            <button type="button" className="edit-btn" onClick={onCancel}>Cancel</button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default ItemEditForm;
