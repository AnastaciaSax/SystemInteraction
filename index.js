import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { fetchRoutes, createRoute, updateRoute, deleteRoute } from '../../store/slices/routesSlice';
import { fetchCountries } from '../../store/slices/countriesSlice';
import RouteList from '../../components/routes/RouteList';
import RouteForm from '../../components/routes/RouteForm';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ConfirmModal from '../../components/common/ConfirmModal';
import styles from './Routes.module.css';

const RoutesPage = () => {
  const dispatch = useDispatch();
  const { items: routes, loading, error } = useSelector((state) => state.routes);
  const { items: countries } = useSelector((state) => state.countries);
  const [showForm, setShowForm] = useState(false);
  const [editingRoute, setEditingRoute] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [routeToDelete, setRouteToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchRoutes());
    dispatch(fetchCountries());
  }, [dispatch]);

  const handleCreate = () => {
    setEditingRoute(null);
    setShowForm(true);
  };

  const handleEdit = (route) => {
    setEditingRoute(route);
    setShowForm(true);
  };

  const handleDeleteClick = (route) => {
    setRouteToDelete(route);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (routeToDelete) {
      try {
        await dispatch(deleteRoute(routeToDelete.id)).unwrap();
        setShowDeleteModal(false);
        setRouteToDelete(null);
      } catch (error) {
        alert(`Cannot delete route: ${error.message}`);
      }
    }
  };

  const handleSubmit = async (routeData) => {
    try {
      if (editingRoute) {
        await dispatch(updateRoute({ id: editingRoute.id, ...routeData })).unwrap();
      } else {
        await dispatch(createRoute(routeData)).unwrap();
      }
      setShowForm(false);
      setEditingRoute(null);
    } catch (error) {
      console.error('Failed to save route:', error);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Container>
      <div className={styles.header}>
        <Row className="align-items-center">
          <Col>
            <h1 className={styles.title}>Routes Management</h1>
            <p className={styles.subtitle}>Create and manage tour routes and packages</p>
          </Col>
          <Col xs="auto">
            <Button 
              variant="primary" 
              onClick={handleCreate}
              className={styles.createButton}
            >
              + Add New Route
            </Button>
          </Col>
        </Row>
      </div>

      {error && (
        <Alert variant="danger" className={styles.alert}>
          {error}
        </Alert>
      )}

      <Row>
        <Col>
          {showForm ? (
            <div className={styles.formContainer}>
              <RouteForm
                route={editingRoute}
                countries={countries}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setShowForm(false);
                  setEditingRoute(null);
                }}
              />
            </div>
          ) : (
            <div className={styles.listContainer}>
              <RouteList
                routes={routes}
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
        title="Delete Route"
        message={`Are you sure you want to delete "${routeToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />
    </Container>
  );
};

export default RoutesPage;