import React, { useState, useEffect } from "react";
import axios from "axios";

const PokemonAbilities = ({ pokemonId }) => {
  const [abilities, setAbilities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAbilityDescriptions = async (abilitiesData) => {
      try {
        const abilityPromises = abilitiesData.map(async (abilityInfo) => {
          const response = await axios.get(abilityInfo.ability.url);
          const effectEntry = response.data.effect_entries.find(
            (entry) => entry.language.name === "en"
          ); // Get the description in English
          return {
            name: abilityInfo.ability.name,
            description: effectEntry
              ? effectEntry.effect
              : "No description available",
          };
        });

        const abilitiesWithDescriptions = await Promise.all(abilityPromises);
        setAbilities(abilitiesWithDescriptions);
      } catch (error) {
        setError("Error fetching ability descriptions");
      }
    };

    const fetchPokemonAbilities = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
        );
        fetchAbilityDescriptions(response.data.abilities);
      } catch (error) {
        setError("Error fetching Pokémon abilities");
      }
    };

    fetchPokemonAbilities();
  }, [pokemonId]);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul className="pokemon-abilities">
          {abilities.map((ability, index) => (
            <li className="mb-2" key={index}>
              <strong>{ability.name.toUpperCase()}:</strong>{" "}
              {ability.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PokemonAbilities;
