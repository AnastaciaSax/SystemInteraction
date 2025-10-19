import React, { useState, useEffect } from "react";
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
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFromURL = queryParams.get("category");

  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPlace, setCurrentPlace] = useState(categoryFromURL || null);
  const [currentSort, setCurrentSort] = useState(null);
  const [currentSearch, setCurrentSearch] = useState("");
  const [loading, setLoading] = useState(true);
    const [cartCount, setCartCount] = useState(0);

    const [editingService, setEditingService] = useState(null);

  const servicesPerPage = 4;

  // Fetch services
useEffect(() => {
  setServices(servicesData.services); // берем массив services
  setLoading(false);
}, []);

// Обновляем currentPlace, если изменился параметр category
  useEffect(() => {
    setCurrentPlace(categoryFromURL || null);
    setCurrentPage(1); // сбрасываем пагинацию
  }, [categoryFromURL]);

  // Добавление нового сервиса
const handleAddService = () => {
  const newService = {
    id: String(Date.now()),
    title: "New Service",
    category: "Other",
    price: 0,
    photoURL: "./Assets/placeholder.png",
    place: "Unknown",
  };
  setServices([newService, ...services]); // добавляем в начало списка
};

// Удаление сервиса
const handleDeleteService = (id) => {
  if (window.confirm("Are you sure you want to delete this service?")) {
    setServices(services.filter((s) => s.id !== id));
  }
};

// Редактирование сервиса
const handleUpdateService = (updatedService) => {
  setServices(
    services.map((s) => (s.id === updatedService.id ? updatedService : s))
  );
};

// Функция открытия модалки
const handleOpenEdit = (service) => {
  setEditingService(service);
};

// Функция закрытия модалки
const handleCloseEdit = () => {
  setEditingService(null);
};

// Функция сохранения
const handleSaveEdit = (updatedService) => {
  handleUpdateService(updatedService);
  setEditingService(null);
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
           onAddService={handleAddService}
        />

        <ServiceList
  services={paginatedServices}
  onEdit={handleUpdateService}
  onDelete={handleDeleteService}
  onOpenEdit={handleOpenEdit}
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
    onSave={handleSaveEdit}
    onCancel={handleCloseEdit}
  />
)}
    </>
  );
}

export default CatalogPage;
