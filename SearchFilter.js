import React, { useState } from 'react';
import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';

const SearchFilter = ({ 
  onSearch, 
  onFilter, 
  placeholder = "Search...",
  filters = [],
  initialValues = {}
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValues.search || '');
  const [filterValues, setFilterValues] = useState(initialValues);

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

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Row className="g-3 align-items-end">
        {/* Search Input */}
        <Col md={4}>
          <Form.Group>
            <Form.Label>Search</Form.Label>
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
              {filter.type === 'select' ? (
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
              ) : filter.type === 'number' ? (
                <Form.Control
                  type="number"
                  placeholder={filter.placeholder}
                  value={filterValues[filter.name] || ''}
                  onChange={(e) => handleFilterChange(filter.name, e.target.value)}
                />
              ) : (
                <Form.Control
                  type="text"
                  placeholder={filter.placeholder}
                  value={filterValues[filter.name] || ''}
                  onChange={(e) => handleFilterChange(filter.name, e.target.value)}
                />
              )}
            </Form.Group>
          </Col>
        ))}

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