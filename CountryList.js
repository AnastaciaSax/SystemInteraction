// components/countries/CountryList.js - исправленная версия
import React, { useState } from 'react';
import { Card, Row, Col, Button, Badge, Table, ButtonGroup } from 'react-bootstrap';
import CountryCard from './CountryCard';

const CountryList = ({ countries, onEdit, onDelete }) => {
  const [viewMode, setViewMode] = useState('table');
  // Защита от undefined
  const countriesData = countries || [];

  if (countriesData.length === 0) {
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
                {countriesData.length} countries
              </Badge>
            </div>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body className={viewMode === 'card' ? 'p-3' : 'p-0'}>
        {viewMode === 'table' ? (
          <Table responsive hover className="mb-0">
            <thead className="bg-dark text-white">
              <tr>
                <th className="text-white">Name</th>
                <th className="text-white">Currency</th>
                <th className="text-white">Status</th>
                <th className="text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {countriesData.map(country => (
                <tr key={country._id}>
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
                        <strong className="text-dark">{country.name}</strong>
                      </div>
                    </div>
                  </td>
                  <td>
                    <Badge bg="outline-secondary" className="border text-dark">
                      {country.currency}
                    </Badge>
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
                        disabled={country.routesCount > 0}
                        title={
                          country.routesCount > 0 
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
            {countriesData.map(country => (
              <Col key={country._id} md={6} lg={4} className="mb-3">
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