import { useEffect, useState } from "react";
// import styled, {keyframes} from "styled-components";
import axios from "axios";

const cardMain = {
  height: "400px",
  width: "300px",
  backgroundColor: "#FFD659",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "1rem",
};

const cardInner = {
  height: "90%",
  width: "90%",
  backgroundColor: "#fff",
  borderRadius: "5px",
};

const img = {
  height: "70%",
  width: "100%",
  objectFit: "contain",
};

const imgLoading = {
  height: "70%",
  width: "100%",
  backgroundColor: "gray",
};

const heading = {
  textTransform: "capitalize",
};
function PokemonCard({ name, url }) {
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(url);
        setImage(
          response.data.sprites?.other?.dream_world?.front_default || ""
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchPokemon();
  }, [url]);

  return (
    <span style={cardMain}>
      <span style={cardInner}>
        <h1 style={heading}>{name}</h1>
        {image ? <img style={img} src={image} alt={name} /> : <p>Loading</p>}
      </span>
    </span>
  );
}

export default PokemonCard;
