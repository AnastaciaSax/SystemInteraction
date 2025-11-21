import React, { useState } from 'react';
import { Card, Row, Col, Button, Badge, Table, ButtonGroup } from 'react-bootstrap';
import CountryCard from './CountryCard';

const CountryList = ({ countries, onEdit, onDelete }) => {
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'

  if (countries.length === 0) {
    return (
      <Card className="text-center py-5">
        <Card.Body>
          <div className="display-1 mb-3">🌍</div>
          <Card.Title as="h3" className="mb-3">No Countries Found</Card.Title>
          <Card.Text className="text-muted">
            There are no countries to display. Start by adding your first country.
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Header className="bg-light">
        <Row className="align-items-center">
          <Col>
            <h5 className="mb-0">Countries List</h5>
          </Col>
          <Col xs="auto">
            <div className="d-flex align-items-center gap-3">
              <ButtonGroup size="sm">
                <Button
                  variant={viewMode === 'table' ? 'primary' : 'outline-primary'}
                  onClick={() => setViewMode('table')}
                >
                  Table
                </Button>
                <Button
                  variant={viewMode === 'card' ? 'primary' : 'outline-primary'}
                  onClick={() => setViewMode('card')}
                >
                  Cards
                </Button>
              </ButtonGroup>
              <Badge bg="primary" pill>
                {countries.length} countries
              </Badge>
            </div>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body className={viewMode === 'card' ? 'p-3' : 'p-0'}>
        {viewMode === 'table' ? (
          <Table responsive hover className="mb-0">
            <thead className="bg-light">
              <tr>
                <th>Name</th>
                <th>Currency</th>
                <th>Routes Count</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {countries.map(country => (
                <tr key={country.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{
                          width: '40px',
                          height: '40px',
                          backgroundColor: '#e9ecef',
                          fontSize: '1.2rem'
                        }}
                      >
                        {getCountryFlag(country.name)}
                      </div>
                      <div>
                        <strong>{country.name}</strong>
                      </div>
                    </div>
                  </td>
                  <td>
                    <Badge bg="outline-secondary" className="border">
                      {country.currency}
                    </Badge>
                  </td>
                  <td>
                    <span className="fw-bold text-primary">
                      {country.Routes ? country.Routes.length : 0}
                    </span>{' '}
                    routes
                  </td>
                  <td>
                    <Badge bg="success">
                      Active
                    </Badge>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => onEdit(country)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => onDelete(country)}
                        disabled={country.Routes && country.Routes.length > 0}
                        title={
                          country.Routes && country.Routes.length > 0 
                            ? "Cannot delete country with existing routes" 
                            : "Delete country"
                        }
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Row>
            {countries.map(country => (
              <Col key={country.id} md={6} lg={4} className="mb-3">
                <CountryCard
                  country={country}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </Col>
            ))}
          </Row>
        )}
      </Card.Body>
    </Card>
  );
};

// Helper function to get country flag emoji
const getCountryFlag = (countryName) => {
  const flagEmojis = {
    'Turkey': '🇹🇷',
    'Egypt': '🇪🇬',
    'Spain': '🇪🇸',
    'Italy': '🇮🇹',
    'Thailand': '🇹🇭',
    'Greece': '🇬🇷',
    'France': '🇫🇷',
    'USA': '🇺🇸',
    'Maldives': '🇲🇻',
    'UAE': '🇦🇪',
    'Germany': '🇩🇪',
    'Japan': '🇯🇵'
  };
  
  return flagEmojis[countryName] || '🌍';
};

export default CountryList;