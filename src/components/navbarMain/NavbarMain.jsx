import React, { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import logo from "../../logo/logoJasper.png";
import "./navbarMain.scss";
import { FaArtstation } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="jm__navbar">
      <div className="jm__navbar-links">
        <div className="jm__navbar-links_logo">
          <Link to="/" style={{ textDecoration: "none" }}>
            <img src={logo} alt="" />
          </Link>
        </div>
        <p className="dashed"></p>
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
            to="/videoEditting"
            style={{ textDecoration: "none" }}
          >
            <p>VideoEditting</p>
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
                  <p>Home</p>
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
                  to="/videoEditting"
                  style={{ textDecoration: "none" }}
                >
                  <p>VideoEditting</p>
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
          )}
        </div>
      </div>
      <div className="flexmedialogos">
        <FaArtstation
          className="medialogos"
          onClick={(e) => {
            window.open("https://www.artstation.com/jasper_moens", "_blank");
          }}
        />
        <FaInstagram
          className="medialogos"
          onClick={(e) => {
            window.open("https://www.instagram.com/jaspermoens/", "_blank");
          }}
        />
        <FaYoutube
          className="medialogos"
          onClick={(e) => {
            window.open(
              "https://www.youtube.com/channel/UCxmr6fCjOKCjenO3oNMQvbA/videos",
              "_blank"
            );
          }}
        />
        <FaLinkedin
          className="medialogos"
          onClick={(e) => {
            window.open("https://www.linkedin.com/in/jaspermoens/", "_blank");
          }}
        />
      </div>
    </div>
  );
};

export default Navbar;
