import React, { useState, useEffect } from "react";
import axios from "axios";

const PokemonWeaknesses = ({ pokemonId }) => {
  const [typeData, setTypeData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTypeRelations = async (typesData) => {
      try {
        const typePromises = typesData.map(async (typeInfo) => {
          const response = await axios.get(typeInfo.type.url); // Get type details
          return {
            name: typeInfo.type.name,
            damage_relations: response.data.damage_relations, // Extract damage relations
          };
        });

        const typesWithRelations = await Promise.all(typePromises);
        setTypeData(typesWithRelations);
      } catch (error) {
        setError("Error fetching type relations");
      }
    };

    const fetchPokemonTypes = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
        );
        fetchTypeRelations(response.data.types);
      } catch (error) {
        setError("Error fetching Pokémon types");
      }
    };

    fetchPokemonTypes();
  }, [pokemonId]);

  const extractRelations = (relationType) => {
    // Combine damage relations from all types (if the Pokémon has more than one type)
    const combinedRelations = typeData.reduce((acc, type) => {
      return [...acc, ...type.damage_relations[relationType]];
    }, []);

    // Filter out duplicate types
    const uniqueRelations = [
      ...new Set(combinedRelations.map((relation) => relation.name)),
    ];

    return uniqueRelations;
  };

  const weaknesses = extractRelations("double_damage_from");
  const resistances = extractRelations("half_damage_from");
  const immunities = extractRelations("no_damage_from");

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="pokemon-wri">
          <div className="card text-center">
            <div className="card-header fw-bold px-0 d-flex align-self-center">Weaknesses</div>
            <ul className="pokemon-wri-list">
              {weaknesses.length > 0 ? (
                weaknesses.map((type, index) => <li key={index}>{type}</li>)
              ) : (
                <li>No specific weaknesses</li>
              )}
            </ul>
          </div>

          <div className="card">
            <div className="card-header fw-bold px-0 d-flex align-self-center">Resistances</div>
            <ul className="pokemon-wri-list">
              {resistances.length > 0 ? (
                resistances.map((type, index) => <li key={index}>{type}</li>)
              ) : (
                <li>No specific resistances</li>
              )}
            </ul>
          </div>

          <div className="card">
            <div className="card-header fw-bold px-0 d-flex align-self-center">Immunities</div>
            <ul className="pokemon-wri-list">
              {immunities.length > 0 ? (
                immunities.map((type, index) => <li key={index}>{type}</li>)
              ) : (
                <li>No immunities</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonWeaknesses;
