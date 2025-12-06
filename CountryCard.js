// components/countries/CountryCard.js - исправленная версия
import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

const CountryCard = ({ country, onEdit, onDelete }) => {
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

  return (
    <Card className="h-100">
      <Card.Body className="d-flex flex-column">
        <div className="d-flex align-items-center mb-3">
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center me-3"
            style={{
              width: '50px',
              height: '50px',
              backgroundColor: '#e9ecef',
              fontSize: '1.5rem'
            }}
          >
            {getCountryFlag(country.name)}
          </div>
          <div>
            <Card.Title className="mb-1 text-dark">{country.name}</Card.Title>
            <Badge bg="info" className="text-dark">
              {country.currency}
            </Badge>
          </div>
        </div>
        
        <div className="mt-auto">
          <div className="mb-2">
            <Badge bg="success" className="me-2">
              Active
            </Badge>
          </div>
          
          <div className="d-grid gap-2">
            <Button 
              variant="outline-primary" 
              size="sm"
              onClick={() => onEdit(country)}
            >
              Edit Country
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
        </div>
      </Card.Body>
    </Card>
  );
};

export default CountryCard;