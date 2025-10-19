import React from "react";
import { Link } from "react-router-dom";

import "./NotFound.css";

function NotFound() {
  return (
    <main className="notfound-page">
      <div className="notfound-content">
        <h1 className="notfound-title">404</h1>
        <h2 className="notfound-subtitle">Page Not Found</h2>
        <p className="notfound-text">
          The page you're looking for doesn't exist or in the pipeline.
        </p>

        <Link to="/" className="notfound-button">
          Back to Home
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
