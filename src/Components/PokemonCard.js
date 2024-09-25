import "../Style Components/Style.css";
import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import typeIcons from "../Assets/typeIcons"; // Import from the new file
import Modal from "./Modal";

export default function PokemonCard({ name, url, key }) {
  const [image, setImage] = useState(null);
  const [types, setTypes] = useState([]);

  // Memoize type colors to avoid recalculating on every render
  const typeColors = useMemo(
    () => ({
      fire: "#F08030",
      water: "#6890F0",
      grass: "#78C850",
      electric: "#F8D030",
      ice: "#98D8D8",
      fighting: "#C03028",
      poison: "#A040A0",
      ground: "#E0C068",
      flying: "#A890F0",
      psychic: "#F85888",
      bug: "#A8B820",
      rock: "#B8A038",
      ghost: "#705898",
      dark: "#705848",
      dragon: "#7038F8",
      steel: "#B8B8D0",
      fairy: "#EE99AC",
      normal: "#9ca49c",
    }),
    []
  );

  const fetchPokemon = useCallback(async () => {
    try {
      const response = await axios.get(url);

      const pokemonImage =
        response.data.sprites?.other?.dream_world?.front_default || "";
      setImage(pokemonImage);

      const pokemonTypes = response.data.types.map(
        (typeInfo) => typeInfo.type.name
      );

      setTypes(pokemonTypes);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  }, [url]);

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  const primaryTypeColor = types.length > 0 ? typeColors[types[0]] : "#9ca49c";

  const renderTypes = () => {
    return types.map((type, index) => (
      <div
        title={type}
        key={index}
        className="type"
        style={{ backgroundColor: typeColors[type] }}
      >
        <img
          src={typeIcons[type]}
          alt={`${type} icon`}
          className="type-image"
        />
      </div>
    ));
  };

  // Use the name as a unique identifier for the modal ID
  const modalId = `modal-${name}`;

  return (
    <>
      <div className="pokemon-card">
        <div className="card-header">
          <h1 className="pokemon-name">{name}</h1>
          <div className="pokemon-types">{renderTypes()}</div>
        </div>
        <div className="pokemon">
          <img className="pokemon-image" src={image} alt={name} />
          <div
            className="circle"
            style={{ backgroundColor: primaryTypeColor }}
          />
        </div>
        <button
          className="pokemon-details"
          data-bs-toggle="modal"
          data-bs-target={`#${modalId}`}
        >
          Details
        </button>
      </div>

      {/* Modal */}

      <Modal
        id={modalId}
        name={name}
        image={image}
        renderTypes={renderTypes}
        primaryTypeColor={primaryTypeColor}
      />
    </>
  );
}
