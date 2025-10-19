import React from "react";

import "./Pagination.css";

function Pagination({ currentPage, totalPages, setCurrentPage }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <button
        className="prev-page"
        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
      >
        <img src="/Assets/catalogArrowPagin.png" alt="Back" />
      </button>

      <div className="page">
        {pages.map((num) => (
          <button
            key={num}
            className={`page-button ${num === currentPage ? "active" : ""}`}
            onClick={() => setCurrentPage(num)}
          >
            {num < 10 ? `0${num}` : num}
          </button>
        ))}
      </div>

      <button
        className="next-page"
        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
      >
        <img src="/Assets/catalogArrowPagin.png" alt="Next" />
      </button>
    </div>
  );
}

export default Pagination;