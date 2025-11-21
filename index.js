import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { fetchSales, createSale, updateSale, deleteSale } from '../../store/slices/salesSlice';
import { fetchRoutes } from '../../store/slices/routesSlice';
import SaleList from '../../components/sales/SaleList';
import SaleForm from '../../components/sales/SaleForm';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ConfirmModal from '../../components/common/ConfirmModal';
import SearchFilter from '../../components/common/SearchFilter';
import styles from './Sales.module.css';

const SalesPage = () => {
  const dispatch = useDispatch();
  const { items: sales, loading, error } = useSelector((state) => state.sales);
  const { items: routes } = useSelector((state) => state.routes);
  const [showForm, setShowForm] = useState(false);
  const [editingSale, setEditingSale] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [saleToDelete, setSaleToDelete] = useState(null);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    dispatch(fetchSales());
    dispatch(fetchRoutes());
  }, [dispatch]);

  const handleCreate = () => {
    setEditingSale(null);
    setShowForm(true);
  };

  const handleEdit = (sale) => {
    setEditingSale(sale);
    setShowForm(true);
  };

  const handleDeleteClick = (saleId) => {
    const sale = sales.find(s => s.id === saleId);
    setSaleToDelete(sale);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (saleToDelete) {
      try {
        await dispatch(deleteSale(saleToDelete.id)).unwrap();
        setShowDeleteModal(false);
        setSaleToDelete(null);
      } catch (error) {
        alert(`Cannot delete sale: ${error.message}`);
      }
    }
  };

  const handleSubmit = async (saleData) => {
    try {
      if (editingSale) {
        await dispatch(updateSale({ id: editingSale.id, ...saleData })).unwrap();
      } else {
        await dispatch(createSale(saleData)).unwrap();
      }
      setShowForm(false);
      setEditingSale(null);
    } catch (error) {
      console.error('Failed to save sale:', error);
    }
  };

  const handleSearch = (searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  };

  const handleFilter = (filterValues) => {
    setFilters(filterValues);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Container>
      <div className={styles.header}>
        <Row className="align-items-center">
          <Col>
            <h1 className={styles.title}>Sales Management</h1>
            <p className={styles.subtitle}>Track and manage tour package sales</p>
          </Col>
          <Col xs="auto">
            <Button 
              variant="primary" 
              onClick={handleCreate}
              className={styles.createButton}
            >
              + Add New Sale
            </Button>
          </Col>
        </Row>
      </div>

      {error && (
        <Alert variant="danger" className={styles.alert}>
          {error}
        </Alert>
      )}

      {/* Search and Filter Section */}
      {!showForm && (
        <div className={styles.filterSection}>
          <SearchFilter
            onSearch={handleSearch}
            onFilter={handleFilter}
            placeholder="Search sales..."
            filters={[
              {
                name: 'routeId',
                label: 'Route',
                type: 'select',
                options: routes.map(route => ({
                  value: route.id,
                  label: route.name
                }))
              },
              {
                name: 'minQuantity',
                label: 'Min Quantity',
                type: 'number',
                placeholder: 'Min'
              }
            ]}
            initialValues={filters}
          />
        </div>
      )}

      <Row>
        <Col>
          {showForm ? (
            <div className={styles.formContainer}>
              <SaleForm
                sale={editingSale}
                routes={routes}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setShowForm(false);
                  setEditingSale(null);
                }}
              />
            </div>
          ) : (
            <div className={styles.listContainer}>
              <SaleList
                sales={sales}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
              />
            </div>
          )}
        </Col>
      </Row>

      <ConfirmModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Sale"
        message={`Are you sure you want to delete this sale record? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />
    </Container>
  );
};

export default SalesPage;