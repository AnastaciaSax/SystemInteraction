import React, { useState, useEffect } from "react";
import Preloader from "../components/Preloader";
import Header from "../components/Header";
import CatalogBanner from "../components/AtalogBanner";
import FilterSortCart from "../components/FilterSortCart";
import ServiceList from "../components/ServiceList";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";

import "../styles/catalogStyle.css";
import "../styles/catalogAdaptation.css";
import "../styles/catalogAnimation.css";

function CatalogPage() {
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPlace, setCurrentPlace] = useState(null);
  const [currentSort, setCurrentSort] = useState(null);
  const [currentSearch, setCurrentSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const servicesPerPage = 4;
  const userId = 1;

  // Fetch services
  useEffect(() => {
    fetch("http://localhost:3001/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error("Error fetching services:", err))
      .finally(() => setLoading(false));
  }, []);

  // Update cart count
  const updateCartCount = async () => {
    try {
      const res = await fetch(`http://localhost:3001/cart?userId=${userId}`);
      const data = await res.json();
      setCartCount(data.length);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    updateCartCount();
  }, []);

  // Filtered, searched, sorted services
  const filteredServices = services
    .filter((s) => (currentPlace ? s.place === currentPlace : true))
    .filter(
      (s) =>
        s.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
        s.category.toLowerCase().includes(currentSearch.toLowerCase())
    )
    .sort((a, b) => {
      if (!currentSort) return 0;
      if (currentSort === "price") return a.price - b.price;
      return a[currentSort].localeCompare(b[currentSort]);
    });

  // Pagination logic
  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);
  const paginatedServices = filteredServices.slice(
    (currentPage - 1) * servicesPerPage,
    currentPage * servicesPerPage
  );

  // Add service to cart
  const addToCart = async (serviceId) => {
    try {
      const res = await fetch(
        `http://localhost:3001/cart?userId=${userId}&serviceId=${serviceId}`
      );
      const existingItems = await res.json();

      if (existingItems.length > 0) {
        alert("This service is already in your cart.");
        return;
      }

      await fetch("http://localhost:3001/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, serviceId }),
      });

      updateCartCount();
      alert("Service added to cart!");
    } catch (err) {
      console.error("Failed to add service to cart:", err);
    }
  };

  return (
    <>
      <Preloader loading={loading} />
      <Header cartCount={cartCount} />

      <div className="container">
        <CatalogBanner />

        <FilterSortCart
          currentPlace={currentPlace}
          setCurrentPlace={(place) => {
            setCurrentPlace(place);
            setCurrentPage(1);
          }}
          currentSort={currentSort}
          setCurrentSort={(sort) => {
            setCurrentSort(sort);
            setCurrentPage(1);
          }}
          currentSearch={currentSearch}
          setCurrentSearch={(search) => {
            setCurrentSearch(search);
            setCurrentPage(1);
          }}
        />

        <ServiceList services={paginatedServices} addToCart={addToCart} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <Footer />
    </>
  );
}

export default CatalogPage;
