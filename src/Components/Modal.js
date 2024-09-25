import "../Style Components/Style.css";
import { ReactComponent as Pokeball } from "../Assets/pokeball transparent.svg";

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
                  <div className="modal-card-header mb-4">
                    <h1 className="pokemon-name fw-bold">{name}</h1>
                    <div className="pokemon-types">{renderTypes()}</div>
                  </div>

                  {/* ----------------------------Accordion */}
                  <div class="accordion accordion-flush" id="accordionExample">
                    <div class="accordion-item custom-accordion-btn">
                      <h2 class="accordion-header">
                        <button
                          class="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          Overview
                        </button>
                      </h2>
                      <div
                        id="collapseOne"
                        class="accordion-collapse collapse show"
                        data-bs-parent="#accordionExample"
                      >
                        <div class="accordion-body">loremdasdsdasdasdasdas</div>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <h2 class="accordion-header">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          Statistics
                        </button>
                      </h2>
                      <div
                        id="collapseTwo"
                        class="accordion-collapse collapse"
                        data-bs-parent="#accordionExample"
                      >
                        <div class="accordion-body"></div>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <h2 class="accordion-header">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          Abilities
                        </button>
                      </h2>
                      <div
                        id="collapseThree"
                        class="accordion-collapse collapse"
                        data-bs-parent="#accordionExample"
                      >
                        <div class="accordion-body"></div>
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
