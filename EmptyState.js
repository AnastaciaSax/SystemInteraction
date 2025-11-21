import React from 'react';
import { Card, Button } from 'react-bootstrap';

const EmptyState = ({ 
  title = "No data found", 
  message = "There are no items to display.", 
  actionText,
  onAction,
  icon = "📊"
}) => {
  return (
    <Card className="text-center py-5">
      <Card.Body>
        <div className="display-1 mb-3">{icon}</div>
        <Card.Title as="h3" className="mb-3">{title}</Card.Title>
        <Card.Text className="text-muted mb-4">
          {message}
        </Card.Text>
        {actionText && onAction && (
          <Button variant="primary" onClick={onAction}>
            {actionText}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default EmptyState;