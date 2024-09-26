import "../Style Components/Style.css";
import { ReactComponent as Pokeball } from "../Assets/pokeball transparent.svg";
import PokemonOverview from "./PokemonOverview";
import PokemonStats from "./PokemonStats";
import PokemonAbilities from "./PokemonAbilities";
import PokemonWeaknesses from "./PokemonWeaknesses";

export default function Modal({
  id,
  name,
  image,
  renderTypes,
  primaryTypeColor,
}) {
  return (
    <>
      <div
        className="modal fade"
        id={id} // Dynamic modal ID based on name
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby={`${id}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog custom-modal modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`${id}Label`}>
                {name} Details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex flex-row custom-modal-body">
                <div className="col position-relative">
                  <svg className="pokeball">
                    <Pokeball />
                  </svg>

                  <img className="pokemon-image" src={image} alt={name} />
                  <div
                    className="modal-circle"
                    style={{ backgroundColor: primaryTypeColor }}
                  ></div>
                </div>

                {/* ----------------------------Pokemon Overviews */}
                <div className="col me-4">
                  <div className="modal-card-header mb-3">
                    <h1 className="pokemon-name fw-bold">{name}</h1>
                    <div className="pokemon-types">{renderTypes()}</div>
                  </div>

                  {/* ----------------------------Accordion */}
                  <div className="accordion" id={`accordion-${id}`}>
                    <div className="accordion-item custom-accordion-btn">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapseOne-${id}`}
                          aria-expanded="true"
                          aria-controls={`collapseOne-${id}`}
                        >
                          Overview
                        </button>
                      </h2>
                      <div
                        id={`collapseOne-${id}`}
                        className="accordion-collapse collapse show"
                        data-bs-parent={`#accordion-${id}`}
                      >
                        <div className="accordion-body">
                          <PokemonOverview pokemonId={name} />
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapseTwo-${id}`}
                          aria-expanded="false"
                          aria-controls={`collapseTwo-${id}`}
                        >
                          Statistics
                        </button>
                      </h2>
                      <div
                        id={`collapseTwo-${id}`}
                        className="accordion-collapse collapse"
                        data-bs-parent={`#accordion-${id}`}
                      >
                        <div className="accordion-body">
                          <PokemonStats pokemonId={name} />
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapseThree-${id}`}
                          aria-expanded="false"
                          aria-controls={`collapseThree-${id}`}
                        >
                          Abilities
                        </button>
                      </h2>
                      <div
                        id={`collapseThree-${id}`}
                        className="accordion-collapse collapse"
                        data-bs-parent={`#accordion-${id}`}
                      >
                        <div className="accordion-body">
                          <PokemonAbilities pokemonId={name} />
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapseFour-${id}`}
                          aria-expanded="false"
                          aria-controls={`collapseFour-${id}`}
                        >
                          Weaknesses, Resistances, Immunities
                        </button>
                      </h2>
                      <div
                        id={`collapseFour-${id}`}
                        className="accordion-collapse collapse"
                        data-bs-parent={`#accordion-${id}`}
                      >
                        <div className="accordion-body">
                          <PokemonWeaknesses pokemonId={name} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
