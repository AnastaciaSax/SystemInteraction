import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';

const RouteForm = ({ route, onSubmit, onCancel, countries = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    countryId: '',
    price_usd: '',
    duration_days: '',
    description: '',
    photo_url: '',
    is_active: true
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (route) {
      setFormData({
        name: route.name || '',
        countryId: route.countryId || '',
        price_usd: route.price_usd || '',
        duration_days: route.duration_days || '',
        description: route.description || '',
        photo_url: route.photo_url || '',
        is_active: route.is_active !== undefined ? route.is_active : true
      });
    }
  }, [route]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.countryId) newErrors.countryId = 'Country is required';
    if (!formData.price_usd || formData.price_usd <= 0) newErrors.price_usd = 'Valid price is required';
    if (!formData.duration_days || formData.duration_days <= 0) newErrors.duration_days = 'Valid duration is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        price_usd: parseFloat(formData.price_usd),
        duration_days: parseInt(formData.duration_days)
      });
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {route ? 'Edit Route' : 'Create New Route'}
        </Card.Title>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Route Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                  placeholder="Enter route name"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Country *</Form.Label>
                <Form.Select
                  name="countryId"
                  value={formData.countryId}
                  onChange={handleChange}
                  isInvalid={!!errors.countryId}
                >
                  <option value="">Select Country</option>
                  {countries.map(country => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.countryId}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Price (USD) *</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="price_usd"
                  value={formData.price_usd}
                  onChange={handleChange}
                  isInvalid={!!errors.price_usd}
                  placeholder="Enter price in USD"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price_usd}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Duration (days) *</Form.Label>
                <Form.Control
                  type="number"
                  name="duration_days"
                  value={formData.duration_days}
                  onChange={handleChange}
                  isInvalid={!!errors.duration_days}
                  placeholder="Enter duration in days"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.duration_days}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Photo URL</Form.Label>
            <Form.Control
              type="url"
              name="photo_url"
              value={formData.photo_url}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter route description"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              name="is_active"
              label="Active Route"
              checked={formData.is_active}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="d-flex gap-2">
            <Button variant="primary" type="submit">
              {route ? 'Update Route' : 'Create Route'}
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

export default RouteForm;