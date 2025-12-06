import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, Table, Alert } from 'react-bootstrap';
import { fetchSalesStats } from '../../store/slices/salesSlice';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import styles from './Statistics.module.css';

const StatisticsPage = () => {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.sales);
  const [filters, setFilters] = useState({
    groupBy: 'country'
  });

  useEffect(() => {
    dispatch(fetchSalesStats(filters));
  }, [dispatch, filters]);

  const formatCurrency = (amount) => {
    if (!amount) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Функция для получения названия страны из статистики MongoDB
  const getCountryName = (stat) => {
    return stat.country_name || stat.countryName || 'Unknown Country';
  };

  // Функция для получения валюты из статистики MongoDB
  const getCurrency = (stat) => {
    return stat.currency || 'USD';
  };

  const totalRevenue = stats.reduce((sum, stat) => sum + parseFloat(stat.total_revenue || 0), 0);
  const totalSales = stats.reduce((sum, stat) => sum + parseInt(stat.total_sales || 0), 0);
  const totalQuantity = stats.reduce((sum, stat) => sum + parseInt(stat.total_quantity || 0), 0);

  if (loading) return <LoadingSpinner />;

  return (
    <Container>
      <div className={styles.header}>
        <h1 className={styles.title}>Sales Statistics</h1>
        <p className={styles.subtitle}>Comprehensive overview of tour sales performance</p>
      </div>

      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}

      {/* Summary Cards */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className={`text-center ${styles.summaryCard}`}>
            <Card.Body>
              <div className={styles.summaryIcon}>💰</div>
              <Card.Title className={styles.summaryTitle}>
                {formatCurrency(totalRevenue)}
              </Card.Title>
              <Card.Text>Total Revenue</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className={`text-center ${styles.summaryCard}`}>
            <Card.Body>
              <div className={styles.summaryIcon}>📦</div>
              <Card.Title className={styles.summaryTitle}>{totalSales}</Card.Title>
              <Card.Text>Total Sales</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className={`text-center ${styles.summaryCard}`}>
            <Card.Body>
              <div className={styles.summaryIcon}>👥</div>
              <Card.Title className={styles.summaryTitle}>{totalQuantity}</Card.Title>
              <Card.Text>Total Travelers</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Statistics Table */}
      <Card>
        <Card.Header className="bg-dark text-white">
          <h5 className="mb-0">Sales by Country</h5>
        </Card.Header>
        <Card.Body className="p-0">
          <Table responsive hover className="mb-0">
            <thead className="bg-light">
              <tr>
                <th>Country</th>
                <th>Currency</th>
                <th>Total Sales</th>
                <th>Total Travelers</th>
                <th>Total Revenue</th>
                <th>Average per Sale</th>
              </tr>
            </thead>
            <tbody>
              {stats.length > 0 ? (
                stats.map((stat, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-light' : ''}>
                    <td className="text-dark">
                      <strong>{getCountryName(stat)}</strong>
                    </td>
                    <td className="text-dark">
                      {getCurrency(stat)}
                    </td>
                    <td className="text-center text-dark">
                      <span className="fw-bold text-primary">{stat.total_sales || 0}</span>
                    </td>
                    <td className="text-center text-dark">
                      <span className="fw-bold text-info">{stat.total_quantity || 0}</span>
                    </td>
                    <td className="text-success fw-bold">
                      {formatCurrency(stat.total_revenue)}
                    </td>
                    <td className="text-warning fw-bold">
                      {formatCurrency(
                        stat.total_revenue / (stat.total_sales || 1)
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    <div className="text-muted">
                      No statistics data available.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default StatisticsPage;