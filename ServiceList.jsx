import React from "react";

function ServiceList({ services, addToCart }) {
  if (services.length === 0)
    return (
      <div className="service-card">
        <div className="not-found-message">
          Sorry, no services found for what you're looking for.
        </div>
      </div>
    );

  return (
    <div className="service-card">
      {services.map((service, index) => (
        <div
          key={service.id}
          className={`service-item ${
            index === 0 ? "first" : index === services.length - 1 ? "last" : ""
          }`}
        >
          <div className="service-pic">
            <img src={service.photoURL} alt={service.title} />
          </div>
          <div className="service-info">
            <div className="service-title">
              <h3>{service.title}</h3>
              <p>{service.category}</p>
            </div>
            <p className="price">$ {service.price}</p>
            <button className="add-to-cart" onClick={() => addToCart(service.id)}>
              <img src="/Assets/cart.svg" alt="Add to cart" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ServiceList;