import React from 'react';
import { Card, Row, Col, Button, Badge } from 'react-bootstrap';

const RouteList = ({ routes, onEdit, onDelete }) => {
  return (
    <Row>
      {routes.map(route => (
        <Col key={route.id} md={6} lg={4} className="mb-4">
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
              <Card.Title>{route.name}</Card.Title>
              <Card.Text className="flex-grow-1">
                <strong>Country:</strong> {route.Country?.name}<br/>
                <strong>Price:</strong> ${route.price_usd}<br/>
                <strong>Duration:</strong> {route.duration_days} days<br/>
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
                    onClick={() => onDelete(route.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default RouteList;