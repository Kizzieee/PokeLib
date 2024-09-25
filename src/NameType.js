import { useState } from "react";
import "./practice.css";
import axios from "axios";
import fire from "./Assets/Fire.png";
import flying from "./Assets/flying.png";

function NameType() {
  const [fireTypePokemon, setFireTypePokemon] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState([]);

  // Fetches fire-type Pokémon
  const getFireTypePokemon = () => {
    axios
      .get(`https://pokeapi.co/api/v2/type/fire`)
      .then((response) => {
        const firePokemonList = response.data.pokemon;
        setFireTypePokemon(firePokemonList);

        // Now fetch the details for each Pokémon in the list
        fetchPokemonDetails(firePokemonList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Fetch individual Pokémon details for their types
  const fetchPokemonDetails = (pokemonList) => {
    const pokemonDetailsPromises = pokemonList.map((pokemon) =>
      axios.get(pokemon.pokemon.url)
    );

    // Once all the requests are resolved, set the state with detailed data
    Promise.all(pokemonDetailsPromises)
      .then((responses) => {
        const detailedPokemon = responses.map((response) => ({
          name: response.data.name,
          types: response.data.types.map((typeInfo) => typeInfo.type.name),
        }));
        setPokemonDetails(detailedPokemon); // Set the details in the state
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Define colors for each type
  const typeColors = {
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
  };

  const typeIcons = {
    fire: fire,
    flying: flying,
  };

  return (
    <div>
      <button onClick={getFireTypePokemon}>Get Fire-Type Pokémon</button>
      <div>
        {pokemonDetails.map((pokemon, index) => (
          <div key={index}>
            <p>Name: {pokemon.name}</p>
            {/* <p>Types: {pokemon.types.join(", ")}</p> */}
            {pokemon.types.map((type, index) => (
              <span
                title={type}
                key={index}
                className="circle"
                style={{ backgroundColor: typeColors[type] }}
              >
                {<img className="type-image" src={typeIcons[type]} alt="" />}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NameType;
