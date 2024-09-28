import announcement from "../Assets/announcement.svg";
function About() {
  return (
    <div className="hero-text">
      <div className="hero-text-img mt-3">
        <div className="white-round-bg"></div>
        <img src={announcement} alt="" />
      </div>

      <div className="hero-text-text">
        <p>
          <strong>Disclaimer:</strong>PokéLib is a personal fan project and is
          not affiliated with, endorsed by, or associated with any official
          Pokémon entity. All Pokémon images are sourced from PokeAPI, while the
          Pokémon type icons are obtained from Bulbapedia. The Pokéball graphic
          is from a free SVG resource. I do not claim ownership of any of these
          assets, which are used solely for non-commercial, personal purposes
          within this fan project, with deep respect for the hard work of the
          original creators. This project is not intended for profit.
        </p>
        <p>Designer & Developer: Kizzelyn Floralde</p>
      </div>
    </div>
  );
}

export default About;
