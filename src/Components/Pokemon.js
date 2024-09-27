import { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";
import "../Style Components/Style.css";

function Pokemon({ selectedType }) {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 15; // Number of Pokémon per page

  // Fetch Pokémon data when the selected type changes
  useEffect(() => {
    const getPokemons = async () => {
      if (selectedType) {
        try {
          const response = await axios.get(selectedType.url);
          const fetchedPokemons = response.data.pokemon.map((p) => ({
            name: p.pokemon.name,
            url: p.pokemon.url,
          }));
          setFilteredPokemons(fetchedPokemons); // Store all Pokémon for the selected type
          setCurrentPage(1); // Reset to the first page when the type changes
        } catch (err) {
          console.log(err);
        }
      }
    };

    getPokemons();
  }, [selectedType]);

  // Calculate the Pokémon to display based on the current page
  const displayedPokemons = filteredPokemons.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredPokemons.length / limit);

  // Handle pagination click (e.g., moving to next/previous page)
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="card-row">
        {displayedPokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            url={pokemon.url}
          />
        ))}
      </div>

      <div className="pagination-result">
        {/* Pagination */}
        {filteredPokemons.length > limit && (
          <nav aria-label="Pokémon pagination">
            <ul className="pagination justify-content-center">
              {/* Previous Button */}
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
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
                <button
                  className="page-link"
                  onClick={() => handlePageChange(1)}
                >
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
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(totalPages)}
                  >
                    {totalPages}
                  </button>
                </li>
              )}

              {/* Next Button */}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
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
        )}
      </div>
    </div>
  );
}

export default Pokemon;
