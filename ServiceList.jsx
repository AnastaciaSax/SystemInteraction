import React, { useState } from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import ItemEditForm from "./ItemEditForm";

function ServiceList({ services, onEdit, onDelete, onOpenEdit }) {
  const [editingId, setEditingId] = useState(null);

  if (services.length === 0) {
    return (
      <Box className="service-card">
        <Box className="not-found-message">
          Sorry, no services found for what you're looking for.
        </Box>
      </Box>
    );
  }

  return (
    <Box className="service-card">
      {services.map((service, index) => (
        <Box
          key={service.id}
          className={`service-item ${
            index === 0 ? "first" : index === services.length - 1 ? "last" : ""
          }`}
        >
          {editingId === service.id ? (
            <ItemEditForm
              item={service}
              onSave={(updated) => {
                onEdit(updated);
                setEditingId(null);
              }}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <>
              <Link to={`/catalog/${service.id}`} className="service-link">
                <Box className="service-pic">
                  <img src={service.photoURL} alt={service.title} />
                </Box>
              </Link>

              <Box className="service-info">
                <Box className="service-title">
                  <Link to={`/catalog/${service.id}`} className="service-link">
                    <h3>{service.title}</h3>
                    <p>{service.category}</p>
                  </Link>
                </Box>

                <p className="price">$ {service.price}</p>

                <Box className="service-controls">
                  <button onClick={() => onOpenEdit(service)}>
                    <img src="/Assets/editBut.svg" alt="Edit" />
                  </button>
                  <button onClick={() => onDelete(service.id)}>
                    <img src="/Assets/bin.svg" alt="Delete" />
                  </button>
                </Box>
              </Box>
            </>
          )}
        </Box>
      ))}
    </Box>
  );
}

export default ServiceList;

