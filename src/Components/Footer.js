import "../Style Components/Style.css";
export default function Footer() {
  return (
    <div style={{backgroundColor: "#F5D125"}}>
      <div className="footer">
        <div className="d-flex flex-column flex-lg-row">
          <div className="col col-12 col-lg-6">
              <p>LinkedIn:</p>
              <a href="https://www.linkedin.com/in/kizzelyn-floralde-922b5b32a/">
                {" "}
                Kizzelyn Floralde
              </a>

          </div>

          <div className="col col-12 col-lg-6">
              <p>Email:</p>
              <p>kizzelynfloralde.work@gmail.com</p>

          </div>
        </div>
      </div>
    </div>
  );
}
