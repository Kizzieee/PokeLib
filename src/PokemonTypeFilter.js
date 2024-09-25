import { useState } from "react";
import axios from "axios";
// import PokemonCard from "./PokemonCard";

function PokemonTypeFilter() {
  const [pokemonType, setPokemonType] = useState([]);
  const [firePokemonList, setfirePokemonList] = useState([]);

  const getPokemonType = () => {
    // let pageNum = page;
    axios
      .get(`https://pokeapi.co/api/v2/type`)
      .then((response) => {
        console.log(response.data.results);
        setPokemonType(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPokemonsUnderType = () => {
    // let pageNum = page;
    axios
      .get(`https://pokeapi.co/api/v2/type/fire`)
      .then((response) => {
        // console.log(response.data.pokemon);
        setfirePokemonList(response.data.pokemon);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <button onClick={getPokemonType}>Get Pokémon Type List</button>
      <div>
        {pokemonType.map((type, index) => (
          <p key={index}>{type.name}</p>
        ))}
      </div>

      <button onClick={getPokemonsUnderType}>Get Fire Pokémon List</button>
      <div>
        {firePokemonList.map((pokemon, index) => (
          <p key={index}>{pokemon.pokemon.name}</p>
        ))}
      </div>

      {/* <button onClick={getPokemonsUnderType}>Get Fire Pokémon List</button>
      <div>
        {firePokemonList.map((pokemon, index) => (
          <p key={index}>{pokemon.name}</p>
        ))}
      </div> */}
    </div>
  );
}

export default PokemonTypeFilter;
