import React, { useState, useEffect } from "react";
import '../Style Components/Style.css'
import axios from "axios";

const PokemonOverview = ({ pokemonId }) => {
  const [description, setDescription] = useState("");
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [captureRate, setCaptureRate] = useState(null);
  const [generation, setGeneration] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonSpecies = async () => {
      try {
        // Fetch the species data
        const speciesResponse = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
        );
        console.log("Species Response:", speciesResponse);

        const flavorTextEntries = speciesResponse.data.flavor_text_entries;

        // Get the English flavor text
        const englishFlavorText = flavorTextEntries.find(
          (entry) => entry.language.name === "en"
        );

        if (englishFlavorText) {
          setDescription(englishFlavorText.flavor_text);
        } else {
          setDescription("No description available in English.");
        }

        // Set capture rate
        setCaptureRate(speciesResponse.data.capture_rate);

        // Fetch generation name by sending another request to the generation endpoint
        const generationResponse = await axios.get(
          speciesResponse.data.generation.url
        );
        setGeneration(generationResponse.data.name);
      } catch (error) {
        console.error("Error fetching Pokémon species data:", error);
        setError("Error fetching Pokémon species data");
      }
    };

    const fetchPokemonData = async () => {
      try {
        const pokemonResponse = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
        );
        console.log("Pokemon Response:", pokemonResponse);

        // Set height and weight (divide by 10 to get meters and kilograms)
        setHeight(pokemonResponse.data.height / 10); // height in meters
        setWeight(pokemonResponse.data.weight / 10); // weight in kilograms
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
        setError("Error fetching Pokémon data");
      }
    };

    // Fetch both species and Pokémon data
    fetchPokemonSpecies();
    fetchPokemonData();
  }, [pokemonId]);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="pokemon-overview">
          <p>{description ? `${description} m` : "Loading..."}</p>
          <p>
            <strong>Height:</strong> {height ? `${height} m` : "Loading..."}
          </p>
          <p>
            <strong>Weight:</strong> {weight ? `${weight} kg` : "Loading..."}
          </p>
          <p>
            <strong>Capture Rate:</strong>{" "}
            {captureRate ? captureRate : "Loading..."}
          </p>
          <p>
            <strong>Generation:</strong>{" "}
            {generation ? generation : "Loading..."}
          </p>
        </div>
      )}
    </div>
  );
};

export default PokemonOverview;
