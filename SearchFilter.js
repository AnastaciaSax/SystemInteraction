
import React, { useState } from 'react';
import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';

const SearchFilter = ({ 
  onSearch, 
  onFilter, 
  placeholder = "Search...",
  filters = [],
  initialValues = {},
  onSortChange
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValues.search || '');
  const [filterValues, setFilterValues] = useState({
    ...initialValues,
    ...filters.reduce((acc, filter) => {
      if (initialValues[filter.name] === undefined) {
        acc[filter.name] = '';
      }
      return acc;
    }, {})
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filterName, value) => {
    const newFilterValues = {
      ...filterValues,
      [filterName]: value
    };
    setFilterValues(newFilterValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Applying filters:', searchTerm, filterValues);
    onSearch(searchTerm);
    onFilter(filterValues);
  };

  const handleClear = () => {
    setSearchTerm('');
    const clearedFilters = {};
    filters.forEach(filter => {
      clearedFilters[filter.name] = '';
    });
    setFilterValues(clearedFilters);
    onSearch('');
    onFilter(clearedFilters);
  };

  const renderFilterInput = (filter) => {
    switch (filter.type) {
      case 'select':
        return (
          <Form.Select
            value={filterValues[filter.name] || ''}
            onChange={(e) => handleFilterChange(filter.name, e.target.value)}
          >
            <option value="">All {filter.label}</option>
            {filter.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Select>
        );
      
      case 'number':
        return (
          <Form.Control
            type="number"
            placeholder={filter.placeholder}
            value={filterValues[filter.name] || ''}
            onChange={(e) => handleFilterChange(filter.name, e.target.value)}
          />
        );
      
      case 'date':
        return (
          <Form.Control
            type="date"
            value={filterValues[filter.name] || ''}
            onChange={(e) => handleFilterChange(filter.name, e.target.value)}
          />
        );
      
      default:
        return (
          <Form.Control
            type="text"
            placeholder={filter.placeholder}
            value={filterValues[filter.name] || ''}
            onChange={(e) => handleFilterChange(filter.name, e.target.value)}
          />
        );
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Row className="g-3 align-items-end">
        {/* Search Input */}
        <Col md={3}>
          <Form.Group>
            <Form.Label>Search Routes</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </InputGroup>
          </Form.Group>
        </Col>

        {/* Dynamic Filters */}
        {filters.map((filter) => (
          <Col key={filter.name} md={2}>
            <Form.Group>
              <Form.Label>{filter.label}</Form.Label>
              {renderFilterInput(filter)}
            </Form.Group>
          </Col>
        ))}

        {/* Sort By */}
        <Col md={2}>
          <Form.Group>
            <Form.Label>Sort By</Form.Label>
            <Form.Select onChange={onSortChange} defaultValue="name">
              <option value="name">Name A-Z</option>
              <option value="name_desc">Name Z-A</option>
              <option value="price_usd">Price Low-High</option>
              <option value="price_usd_desc">Price High-Low</option>
              <option value="duration_days">Shortest Duration</option>
              <option value="duration_days_desc">Longest Duration</option>
            </Form.Select>
          </Form.Group>
        </Col>

        {/* Action Buttons */}
        <Col md={2}>
          <div className="d-grid gap-2">
            <Button type="submit" variant="primary">
              Apply
            </Button>
            <Button type="button" variant="outline-secondary" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchFilter;