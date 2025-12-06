import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';

const SaleForm = ({ sale, onSubmit, onCancel, routes = [] }) => {
  const [formData, setFormData] = useState({
    routeId: '',
    sale_date: '',
    visa_cost_usd: '',
    quantity: ''
  });

  const [errors, setErrors] = useState({});
  const [selectedRoute, setSelectedRoute] = useState(null);

  useEffect(() => {
    if (sale) {
      // Получаем routeId из sale.route (ObjectId или объект)
      const routeId = sale.route?._id || sale.route || '';
      
      setFormData({
        routeId: routeId,
        sale_date: sale.sale_date || '',
        visa_cost_usd: sale.visa_cost_usd || '',
        quantity: sale.quantity || ''
      });
      
      // Find the selected route for calculation
      const route = routes.find(r => {
        const routeObjId = r.id || r._id;
        return routeObjId === routeId;
      });
      setSelectedRoute(route);
    }
  }, [sale, routes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // If route changes, update selected route
    if (name === 'routeId') {
      const route = routes.find(r => {
        const routeObjId = r.id || r._id;
        return routeObjId === value;
      });
      setSelectedRoute(route);
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const calculateTotalCost = () => {
    if (!selectedRoute || !formData.quantity || !formData.visa_cost_usd) {
      return 0;
    }
    const routePrice = parseFloat(selectedRoute.price_usd);
    const quantity = parseInt(formData.quantity);
    const visaCost = parseFloat(formData.visa_cost_usd);
    return (routePrice * quantity) + (visaCost * quantity);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.routeId) newErrors.routeId = 'Route is required';
    if (!formData.sale_date) newErrors.sale_date = 'Sale date is required';
    if (!formData.visa_cost_usd || formData.visa_cost_usd <= 0) newErrors.visa_cost_usd = 'Valid visa cost is required';
    if (!formData.quantity || formData.quantity <= 0) newErrors.quantity = 'Valid quantity is required';
    
    // Check if sale date is not in the future
    const saleDate = new Date(formData.sale_date);
    const today = new Date();
    if (saleDate > today) {
      newErrors.sale_date = 'Sale date cannot be in the future';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const total_cost_usd = calculateTotalCost();
      onSubmit({
        ...formData,
        visa_cost_usd: parseFloat(formData.visa_cost_usd),
        quantity: parseInt(formData.quantity),
        total_cost_usd
      });
    }
  };

  const totalCost = calculateTotalCost();

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {sale ? 'Edit Sale' : 'Create New Sale'}
        </Card.Title>
        
        {selectedRoute && (
          <Alert variant="info" className="mb-4">
            <strong>Route Information:</strong> {selectedRoute.name} - ${selectedRoute.price_usd} per person
            {selectedRoute.country && (
              <span> ({selectedRoute.country.name})</span>
            )}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Route *</Form.Label>
                <Form.Select
                  name="routeId"
                  value={formData.routeId}
                  onChange={handleChange}
                  isInvalid={!!errors.routeId}
                >
                  <option value="">Select Route</option>
                  {routes.map(route => {
                    const routeId = route.id || route._id;
                    const countryName = route.country?.name || 'Unknown';
                    return (
                      <option key={routeId} value={routeId}>
                        {route.name} - ${route.price_usd} ({countryName})
                      </option>
                    );
                  })}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.routeId}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Sale Date *</Form.Label>
                <Form.Control
                  type="date"
                  name="sale_date"
                  value={formData.sale_date}
                  onChange={handleChange}
                  isInvalid={!!errors.sale_date}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.sale_date}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Visa Cost (USD) *</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="visa_cost_usd"
                  value={formData.visa_cost_usd}
                  onChange={handleChange}
                  isInvalid={!!errors.visa_cost_usd}
                  placeholder="Enter visa cost per person"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.visa_cost_usd}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Quantity *</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  isInvalid={!!errors.quantity}
                  placeholder="Number of persons"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.quantity}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {totalCost > 0 && (
            <Alert variant="success" className="mb-3">
              <strong>Total Cost:</strong> ${totalCost.toFixed(2)}
              <br />
              <small className="text-muted">
                (Route: ${selectedRoute?.price_usd} × {formData.quantity} + Visa: ${formData.visa_cost_usd} × {formData.quantity})
              </small>
            </Alert>
          )}

          <div className="d-flex gap-2">
            <Button variant="primary" type="submit">
              {sale ? 'Update Sale' : 'Create Sale'}
            </Button>
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SaleForm;