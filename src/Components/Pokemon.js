import { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";
import "../Style Components/Style.css";

// const row = {
//   display: "flex",
//   flexDirection: "row",
//   justifyContent: "space-between",
//   alignItems: "flex-center",
//   flexWrap: "wrap",

// };

function Pokemon() {
  const [pokemons, setPokemons] = useState([]);
  const [offSet, setOffSet] = useState(0);

  const getPokemons = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=15&offset=${offSet}`)
      .then((response) => {
        console.log(response.data.results);
        setPokemons((prevPokemons) => [
          ...prevPokemons,
          ...response.data.results,
        ]); // Append the new Pokémon to the existing list
        setOffSet((prevOffSet) => prevOffSet + 15);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Automatically fetch Pokémon data when the component mounts
  useEffect(() => {
    getPokemons();
  }, []); // Empty dependency array ensures it only runs once when the component mounts

  return (
    <div>
      <div className="card-row">
        {pokemons.map((pokemon, index) => (
          <PokemonCard key={index} name={pokemon.name} url={pokemon.url} />
        ))}
      </div>
    </div>
  );
}

export default Pokemon;
