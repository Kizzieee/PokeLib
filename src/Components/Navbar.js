// Components
import Home from "./Home";
import About from "./About";

//Assets
import PokeLib from "../Assets/Pokelib nav logo.svg";
import "../Style Components/Style.css";

import { Routes, Route, Link, NavLink } from "react-router-dom";
import { useEffect } from "react";

function Navbar() {
  useEffect(() => {
    const handleScroll = () => {
      const navBar = document.querySelector(".navbar"); // Note: use a class selector
      if (window.scrollY > 0) {
        navBar.classList.add("scrolled");
      } else {
        navBar.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="navbar fixed-top">
        <div className="logo">
          <Link to="/">
            <img src={PokeLib} alt="PokeLib NavLogo" />
          </Link>
        </div>

        <div className="links">
          <NavLink
            exact
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            About
          </NavLink>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default Navbar;
