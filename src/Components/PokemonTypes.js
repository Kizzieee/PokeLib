import React, { useEffect, useState, useMemo } from "react";
import "../Style Components/Style.css";
import typeIcons from "../Assets/typeIcons";
import Pokemon from "./Pokemon"; // Ensure this is imported
import axios from "axios";

const PokemonTypes = () => {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

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

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/type");
        console.log("Fetched Pokémon types:", response.data.results);

        // Filter out "stellar" and "unknown" types
        const filteredTypes = response.data.results.filter(
          (type) => type.name !== "stellar" && type.name !== "unknown"
        );

        setTypes(filteredTypes);

        // Set Normal type as default selected type
        const normalType = filteredTypes.find((type) => type.name === "normal");
        setSelectedType(normalType); // Set Normal type as the default
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    };

    fetchTypes();
  }, []);

  const handleTypeClick = (type) => {
    setSelectedType(type);
  };

  return (
    <div>
      {/* Tabs for larger screens */}
      <div className="d-none d-md-block">
        <ul className="nav nav-tabs text-primary">
          {types.map((type) => (
            <li className="nav-item" key={type.name}>
              <button
                className={`nav-link ${
                  selectedType && selectedType.name === type.name
                    ? "active"
                    : ""
                }`}
                onClick={() => handleTypeClick(type)}
              >
                <div
                  className="circle-type"
                  style={{
                    backgroundColor: typeColors[type.name] || "#000",
                  }}
                  title={`${type.name}`}
                >
                  <img
                    src={typeIcons[type.name]}
                    alt={`${type.name} icon`}
                    className="type-image"
                  />
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Dropdown for smaller screens */}
      <div className="d-md-none">
        <div className="dropdown m-3">
          <button
            className="btn btn-secondary dropdown-toggle p-2"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            
              {selectedType ? selectedType.name.toUpperCase() : "Select Type"}
          
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {types.map((type) => (
              <li key={type.name}>
                <button
                  className={`dropdown-item d-flex justify-content-center ${
                    selectedType && selectedType.name === type.name
                      ? "active"
                      : ""
                  }`}
                  onClick={() => handleTypeClick(type)}
                >
                  <div
                    className="circle-type me-2 d-flex"
                    style={{
                      display: "inline-block",
                      backgroundColor: typeColors[type.name] || "#000",
                      width: "1.5rem",
                      height: "1.5rem",
                      borderRadius: "50%",
                      marginRight: "0.5rem",
                    }}
                  >
                    <img
                      src={typeIcons[type.name]}
                      alt={`${type.name} icon`}
                      className="type-image"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  {type.name.toUpperCase()}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Display the selected type */}
      {selectedType && (
        <div>
          <div className="d-none d-md-block">
            <h1 className="type-name">{selectedType.name.toUpperCase()}</h1>
          </div>
          <Pokemon selectedType={selectedType} />
        </div>
      )}
    </div>
  );
};

export default PokemonTypes;
