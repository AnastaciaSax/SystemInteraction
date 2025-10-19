import React from "react";

import "./AtalogBanner.css";

function CatalogBanner() {
  return (
    <main className="banner banner--catalog">
      <div className="intro">
        <div className="into-title">
          <h2 data-i18n="catalogTitle">Design Catalog</h2>
          <span data-i18n="homeCatalogBreadcrumb">Home / Catalog</span>
        </div>
      </div>
    </main>
  );
}

export default CatalogBanner;