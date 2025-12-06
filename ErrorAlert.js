import React from 'react';
import { Alert, Button } from 'react-bootstrap';

const ErrorAlert = ({ 
  error, 
  onDismiss, 
  showRetry = false, 
  onRetry,
  className = "" 
}) => {
  if (!error) return null;

  return (
    <Alert variant="danger" className={className}>
      <div className="d-flex justify-content-between align-items-start">
        <div className="flex-grow-1">
          <Alert.Heading>Error</Alert.Heading>
          <p className="mb-0">{error}</p>
        </div>
        <div className="d-flex flex-column ms-3">
          {onDismiss && (
            <Button 
              variant="outline-danger" 
              size="sm" 
              onClick={onDismiss}
              className="mb-2"
            >
              Dismiss
            </Button>
          )}
          {showRetry && onRetry && (
            <Button 
              variant="danger" 
              size="sm" 
              onClick={onRetry}
            >
              Retry
            </Button>
          )}
        </div>
      </div>
    </Alert>
  );
};

export default ErrorAlert;