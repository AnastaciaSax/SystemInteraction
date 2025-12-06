import React from 'react';
import { Card, Row, Col, Button, Badge } from 'react-bootstrap';

const RouteList = ({ routes, onEdit, onDelete }) => {
  // Защита от undefined
  const routesData = routes || [];

  if (routesData.length === 0) {
    return (
      <Card className="text-center py-5">
        <Card.Body>
          <div className="display-1 mb-3">🗺️</div>
          <Card.Title as="h3" className="mb-3">No Routes Found</Card.Title>
          <Card.Text className="text-muted">
            There are no routes to display. Start by adding your first route.
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Row>
      {routesData.map(route => {
        // Используем id для совместимости (из normalizeObject)
        const routeId = route.id || route._id;
        const countryName = route.country?.name || 'Unknown Country';
        
        return (
          <Col key={routeId} md={6} lg={4} className="mb-4">
            <Card className="h-100">
              {route.photo_url && (
                <Card.Img 
                  variant="top" 
                  src={route.photo_url} 
                  style={{ height: '200px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                  }}
                />
              )}
              <Card.Body className="d-flex flex-column">
                <Card.Title className="text-dark">{route.name}</Card.Title>
                <Card.Text className="flex-grow-1 text-dark">
                  <strong>Country:</strong> {countryName}<br/>
                  <strong>Price:</strong> ${route.price_usd || 0}<br/>
                  <strong>Duration:</strong> {route.duration_days || 0} days<br/>
                  {route.description && (
                    <>
                      <strong>Description:</strong> 
                      <span className="text-muted">
                        {route.description.length > 100 
                          ? `${route.description.substring(0, 100)}...` 
                          : route.description
                        }
                      </span>
                    </>
                  )}
                </Card.Text>
                <div className="mt-auto">
                  <Badge bg={route.is_active ? "success" : "secondary"} className="mb-2">
                    {route.is_active ? "Active" : "Inactive"}
                  </Badge>
                  <div className="d-grid gap-2">
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => onEdit(route)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => onDelete(routeId)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default RouteList;