import React from 'react';
import { Card, Row, Col, Button, Badge, Table } from 'react-bootstrap';

const SaleList = ({ sales, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (sales.length === 0) {
    return (
      <Card className="text-center py-5">
        <Card.Body>
          <div className="display-1 mb-3">💰</div>
          <Card.Title as="h3" className="mb-3">No Sales Found</Card.Title>
          <Card.Text className="text-muted">
            There are no sales records to display.
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Header>
        <h5 className="mb-0">Sales Records</h5>
      </Card.Header>
      <Card.Body className="p-0">
        <Table responsive hover className="mb-0">
          <thead className="bg-light">
            <tr>
              <th>Date</th>
              <th>Route</th>
              <th>Country</th>
              <th>Quantity</th>
              <th>Visa Cost</th>
              <th>Total Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sales.map(sale => (
              <tr key={sale.id}>
                <td>
                  <strong>{formatDate(sale.sale_date)}</strong>
                </td>
                <td>
                  <div>
                    <strong>{sale.Route?.name}</strong>
                    <br />
                    <small className="text-muted">
                      {formatCurrency(sale.Route?.price_usd)} per person
                    </small>
                  </div>
                </td>
                <td>
                  <Badge bg="outline-primary" className="border">
                    {sale.Route?.Country?.name}
                  </Badge>
                </td>
                <td>
                  <span className="fw-bold">{sale.quantity}</span> persons
                </td>
                <td className="text-success">
                  {formatCurrency(sale.visa_cost_usd)}
                </td>
                <td className="text-primary fw-bold">
                  {formatCurrency(sale.total_cost_usd)}
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => onEdit(sale)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => onDelete(sale.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default SaleList;