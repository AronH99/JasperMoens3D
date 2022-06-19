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
            <p>HOME</p>
          </Link>
          <Link
            className="backgroundHoverNavbar"
            to="/2D"
            style={{ textDecoration: "none" }}
          >
            <p>2D</p>
          </Link>
          <Link
            className="backgroundHoverNavbar"
            to="/3D"
            style={{ textDecoration: "none" }}
          >
            <p>3D</p>
          </Link>
          <Link
            className="backgroundHoverNavbar"
            to="/about"
            style={{ textDecoration: "none" }}
          >
            <p>ABOUT</p>
          </Link>
          <Link
            className="backgroundHoverNavbar"
            to="/contact"
            style={{ textDecoration: "none" }}
          >
            <p>CONTACT</p>
          </Link>
        </div>
        <div className="jm__navbar-menu">
          {toggleMenu ? (
            <RiCloseLine
              color="#fff"
              size={50}
              onClick={() => setToggleMenu(false)}
            />
          ) : (
            <RiMenu3Line
              color="#fff"
              size={50}
              onClick={() => setToggleMenu(true)}
            />
          )}
          {toggleMenu && (
            <div className="jm__navbar-menu_container scale-up-center">
              <div className="jm__navbar-menu_container-links">
                <Link
                  className="backgroundHoverNavbar"
                  to="/"
                  style={{ textDecoration: "none" }}
                >
                  <p>HOME</p>
                </Link>
                <Link
                  className="backgroundHoverNavbar"
                  to="/2D"
                  style={{ textDecoration: "none" }}
                >
                  <p>2D</p>
                </Link>
                <Link
                  className="backgroundHoverNavbar"
                  to="/3D"
                  style={{ textDecoration: "none" }}
                >
                  <p>3D</p>
                </Link>
                <Link
                  className="backgroundHoverNavbar"
                  to="/about"
                  style={{ textDecoration: "none" }}
                >
                  <p>ABOUT</p>
                </Link>
                <Link
                  className="backgroundHoverNavbar"
                  to="/contact"
                  style={{ textDecoration: "none" }}
                >
                  <p>CONTACT</p>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
