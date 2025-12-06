import React from 'react';
import { Card, Table, Button, Badge } from 'react-bootstrap';

const SaleList = ({ sales = [], onEdit, onDelete }) => {
  // Максимальная защита - гарантируем, что работаем с массивом
  const safeSales = Array.isArray(sales) ? sales : [];

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return '$0.00';
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) return '$0.00';
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(numAmount);
  };

  // Полностью безопасный рендеринг
  if (!safeSales || safeSales.length === 0) {
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
      <Card.Header className="bg-dark text-white">
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
            {safeSales.map((sale) => {
              // Безопасный доступ ко всем свойствам с нормализацией
              const saleId = sale.id || sale._id || Math.random();
              const routeName = sale?.route?.name || 'Unknown Route';
              const countryName = sale?.route?.country?.name || 'Unknown Country';
              const quantity = sale?.quantity || 0;
              const visaCost = sale?.visa_cost_usd || 0;
              const totalCost = sale?.total_cost_usd || 0;
              const saleDate = sale?.sale_date;
              const routePrice = sale?.route?.price_usd || 0;

              return (
                <tr key={saleId}>
                  <td className="text-dark">
                    <strong>{formatDate(saleDate)}</strong>
                  </td>
                  <td className="text-dark">
                    <div>
                      <strong>{routeName}</strong>
                      <br />
                      <small className="text-muted">
                        {formatCurrency(routePrice)} per person
                      </small>
                    </div>
                  </td>
                  <td className="text-dark">
                    <Badge bg="outline-primary" className="border text-dark">
                      {countryName}
                    </Badge>
                  </td>
                  <td className="text-dark">
                    <span className="fw-bold">{quantity}</span> persons
                  </td>
                  <td className="text-success fw-bold">
                    {formatCurrency(visaCost)}
                  </td>
                  <td className="text-primary fw-bold">
                    {formatCurrency(totalCost)}
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
                        onClick={() => onDelete(saleId)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default SaleList;