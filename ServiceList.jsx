import React, { useState } from "react";
import { Link } from "react-router-dom";
import ItemEditForm from "../ItemEditForm/ItemEditForm";

import "./ServiceList.css";

function ServiceList({ services, onEdit, onDelete, onOpenEdit }) {
  const [editingId, setEditingId] = useState(null);

  if (services.length === 0) {
    return (
      <div className="service-card">
        <div className="not-found-message">
          Sorry, no services found for what you're looking for.
        </div>
      </div>
    );
  }

  return (
    <div className="service-card">
      {services.map((service, index) => (
        <div
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
                <div className="service-pic">
                  <img src={service.photoURL} alt={service.title} />
                </div>
              </Link>

              <div className="service-info">
                <div className="service-title">
                  <Link to={`/catalog/${service.id}`} className="service-link">
                    <h3>{service.title}</h3>
                    <p>{service.category}</p>
                  </Link>
                </div>

                <p className="price">$ {service.price}</p>

  <div className="service-controls">
  <button onClick={() => onOpenEdit(service)}>
    <img src="/Assets/editBut.svg" alt="Edit" />
  </button>
  <button onClick={() => onDelete(service.id)}>
    <img src="/Assets/bin.svg" alt="Delete" />
  </button>
</div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default ServiceList;
