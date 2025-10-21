import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchServices,
  addService,
  deleteService,
  updateService,
  clearError,
} from "../../slices/servicesSlice";

import { useLocation } from "react-router-dom";
import Preloader from "../../components/Preloader/Preloader";
import Header from "../../components/Header/Header";
import CatalogBanner from "../../components/AtalogBanner/AtalogBanner";
import FilterSortCart from "../../components/FilterSortCart/FilterSortCart";
import ServiceList from "../../components/ServiceList/ServiceList";
import Pagination from "../../components/Pagination/Pagination";
import Footer from "../../components/Footer/Footer";
import ItemEditForm from "../../components/ItemEditForm/ItemEditForm";

import servicesData from "../../data/db.json";

import "./catalogStyle.css";
import "./catalogAdaptation.css";
import "./catalogAnimation.css";

function CatalogPage() {
    const dispatch = useDispatch();
  const { items: services, loading, error } = useSelector((state) => state.services);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPlace, setCurrentPlace] = useState(null);
  const [currentSort, setCurrentSort] = useState(null);
  const [currentSearch, setCurrentSearch] = useState("");
  const [editingService, setEditingService] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const servicesPerPage = 4;

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

    useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleAddService = () => {
    const newService = {
      id: String(Date.now()),
      title: "New Service",
      category: "Other",
      price: 100,
      photoURL: "./Assets/placeholder.png",
      place: "Unknown",
    };
    dispatch(addService(newService));
  };

  const handleDeleteService = (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      dispatch(deleteService(id));
    }
  };

  const handleUpdateService = (updatedService) => {
    dispatch(updateService(updatedService));
  };

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
const addToCart = (serviceId) => {
    alert("The Cart page is in the works currently! Thanks for attention :)");
  };
   return (
    <>
      <Preloader loading={loading} />
      <Header cartCount={cartCount} />
      <div className="container">
        <CatalogBanner />

        <FilterSortCart
          currentPlace={currentPlace}
          setCurrentPlace={setCurrentPlace}
          currentSort={currentSort}
          setCurrentSort={setCurrentSort}
          currentSearch={currentSearch}
          setCurrentSearch={setCurrentSearch}
          onAddService={handleAddService}
        />

        <ServiceList
          services={paginatedServices}
          onEdit={handleUpdateService}
          onDelete={handleDeleteService}
          onOpenEdit={setEditingService}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <Footer />
      {editingService && (
        <ItemEditForm
          item={editingService}
          onSave={handleUpdateService}
          onCancel={() => setEditingService(null)}
        />
      )}
    </>
  );
}

export default CatalogPage;
