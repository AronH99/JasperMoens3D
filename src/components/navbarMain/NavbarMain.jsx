import React, { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import logo from "../../logo/logoJasper.png";
import "./navbarMain.scss";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="jm__navbar">
      <div className="jm__navbar-links">
        <div className="jm__navbar-links_logo">
          <img src={logo} alt="" />
        </div>
        <div className="jm__navbar-links_container">
          <Link
            className="backgroundHoverNavbar"
            to="/"
            style={{ textDecoration: "none" }}
          >
            <p>Home</p>
          </Link>
          <Link
            className="backgroundHoverNavbar"
            to="/artwork"
            style={{ textDecoration: "none" }}
          >
            <p>Artwork</p>
          </Link>
          <Link
            className="backgroundHoverNavbar"
            to="/about"
            style={{ textDecoration: "none" }}
          >
            <p>About</p>
          </Link>
          <Link
            className="backgroundHoverNavbar"
            to="/contact"
            style={{ textDecoration: "none" }}
          >
            <p>Contact</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
