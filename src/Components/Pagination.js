// Pagination.js
import React from "react";

function Pagination({ currentPage, totalPages, handlePageChange }) {
  return (
    <nav aria-label="Pokémon pagination">
      <ul className="pagination justify-content-center">
        {/* Previous Button */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>

        {/* First page */}
        <li className={`page-item ${currentPage === 1 ? "active" : ""}`}>
          <button className="page-link" onClick={() => handlePageChange(1)}>
            1
          </button>
        </li>

        {/* Ellipsis for pages between 1 and the current page */}
        {currentPage > 3 && (
          <li className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        )}

        {/* Current Page */}
        {currentPage > 1 && currentPage < totalPages && (
          <li className="page-item active">
            <span className="page-link">{currentPage}</span>
          </li>
        )}

        {/* Ellipsis for pages between the current page and the last page */}
        {currentPage < totalPages - 2 && (
          <li className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        )}

        {/* Last page */}
        {totalPages > 1 && (
          <li className={`page-item ${currentPage === totalPages ? "active" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(totalPages)}
            >
              {totalPages}
            </button>
          </li>
        )}

        {/* Next Button */}
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
