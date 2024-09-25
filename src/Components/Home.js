import PokeLib from "../Assets/PokeLib.svg";
import Pokeball from "../Assets/Pokemon ball.svg";
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
          <button>Explore now!</button>
        </div>

        <div className="hero-text-img">
          <div className="white-round-bg"></div>
          <img src={Pokeball} alt="Pokemon ball" />
        </div>
      </div>

      <div>
        <Pokemon />
      </div>
    </>
  );
}

export default Home;
