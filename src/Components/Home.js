import PokeLib from "../Assets/PokeLib.svg";
import Pokeball from "../Assets/Pokemon ball.svg";
import PokemonTypes from "./PokemonTypes";
import Pokemon from "./Pokemon";

function Home() {
  return (
    <>
      <div className="hero-text">
        <div className="hero-text-text">
          <img src={PokeLib} alt="PokeLib logo" />
          <p className="lead">
            Welcome to PokéLib—your go-to Pokémon library. Discover stats,
            abilities, and more for every Pokémon. Start your journey and
            explore now!
          </p>
          <a href="#pokemon-result" className="explore-btn">
            <button
              type="button"
              className="btn btn-lg btn-danger btn-scroll"
            >
              EXPLORE NOW
            </button>
          </a>
        </div>

        <div className="hero-text-img">
          <div className="white-round-bg"></div>
          <img src={Pokeball} alt="Pokemon ball" />
        </div>
      </div>

      <div id="pokemon-result">
        <PokemonTypes />
        {/* <Pokemon /> */}
      </div>
    </>
  );
}

export default Home;
