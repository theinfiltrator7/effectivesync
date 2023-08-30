import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbarWrapper">
      <div className="logo">Effectivesync</div>
      <div className="filler" />
      <div className="optionWrapper">
        <img className="navIcon" src={require("../../assets/info.png")} />
        <div className="option">About Us</div>
      </div>
      <div className="optionWrapper">
        <img className="navIcon" src={require("../../assets/logout.png")} />
        <div className="option">Sign Out</div>
      </div>
    </div>
  );
};

export default Navbar;
