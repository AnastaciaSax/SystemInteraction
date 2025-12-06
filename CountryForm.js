import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';

const CountryForm = ({ country, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    currency: 'USD'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (country) {
      setFormData({
        name: country.name || '',
        currency: country.currency || 'USD'
      });
    }
  }, [country]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    
    if (!formData.name.trim()) {
      newErrors.name = 'Country name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Country name must be at least 2 characters long';
    }
    
    if (!formData.currency) {
      newErrors.currency = 'Currency is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        name: formData.name.trim(),
        currency: formData.currency
      });
    }
  };

  const currencies = [
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'AUD', name: 'Australian Dollar' },
    { code: 'CHF', name: 'Swiss Franc' },
    { code: 'CNY', name: 'Chinese Yuan' },
    { code: 'RUB', name: 'Russian Ruble' }
  ];

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {country ? 'Edit Country' : 'Create New Country'}
        </Card.Title>
        
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Country Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                  placeholder="Enter country name"
                  maxLength={100}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                  Enter the official name of the country
                </Form.Text>
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Currency *</Form.Label>
                <Form.Select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  isInvalid={!!errors.currency}
                >
                  <option value="">Select Currency</option>
                  {currencies.map(currency => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.currency}
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                  Select the primary currency used in this country
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          {country && country.Routes && country.Routes.length > 0 && (
            <Alert variant="info" className="mb-3">
              <strong>Note:</strong> This country has {country.Routes.length} associated 
              route{country.Routes.length !== 1 ? 's' : ''}. Changing the currency may affect 
              existing route pricing calculations.
            </Alert>
          )}

          <div className="d-flex gap-2">
            <Button variant="primary" type="submit">
              {country ? 'Update Country' : 'Create Country'}
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

export default CountryForm;