import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light mt-5 py-4">
      <Container>
        <Row>
          <Col md={6}>
            <h5>🌍 Tour Agency</h5>
            <p className="mb-0">
              Professional tour management system for modern travel agencies.
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <p className="mb-0">
              &copy; {currentYear} Tour Agency. All rights reserved.
            </p>
            <small className="text-muted">
              Built with React, Redux, Node.js & PostgreSQL
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;