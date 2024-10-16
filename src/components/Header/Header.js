import React from "react";
import "./Header.css";
import avatarImage from "../../images/avatar.svg";
import logo from "../../images/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ weatherData }) {
  // Generating the current date
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const location = weatherData ? weatherData.cityName : "Fetching location...";
  const userName = "Aykut Onat";

  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="Logo" /> {/* Adjust the logo path as necessary */}
      </div>
      <div className="header-date">{currentDate}</div>
      <div className="header-location">{location}</div>{" "}
      {/* Replace with dynamic location */}
      <ToggleSwitch />
      <button className="header__add-button">+ Add Clothes</button>
      <div className="header__avatar-logo">
        <img src={avatarImage} alt="User Avatar" />
        <span>{userName}</span>
      </div>
    </header>
  );
}

export default Header;
