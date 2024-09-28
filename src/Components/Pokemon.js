import { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";
import Pagination from "./Pagination"; // Import the new Pagination component
import "../Style Components/Style.css";

function Pokemon({ selectedType }) {
  // const [pokemons, setPokemons] = useState([]);
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
        {/* Pagination Component */}
        {filteredPokemons.length > limit && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}

export default Pokemon;
