import React, { useState, useEffect } from "react";
import "../Style Components/Style.css";
import axios from "axios";

const PokemonStats = ({ pokemonId }) => {
  const [stats, setStats] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonStats = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
        );
        setStats(response.data.stats);
      } catch (error) {
        setError("Error fetching Pokémon stats");
      }
    };

    fetchPokemonStats();
  }, [pokemonId]);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul className="pokemon-stats">
          {stats.map((stat) => (
            <li key={stat.stat.name}>
              <strong>{stat.stat.name.toUpperCase()}:</strong> {stat.base_stat}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PokemonStats;
