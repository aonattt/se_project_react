import React, { useContext } from "react";
import "./Header.css";
import logo from "../../assets/Logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  onSignUpClick,
  onLogInClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const userInitial = currentUser?.name
    ? currentUser.name.charAt(0).toUpperCase()
    : "";

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/">
          <img className="header__logo" src={logo} alt="Header Logo" />
        </Link>
        <p className="header__date_location">
          {currentDate}, {weatherData?.city}
        </p>
      </div>
      <div className="header__right">
        <ToggleSwitch />

        {isLoggedIn ? (
          <>
            <button
              type="button"
              className="header__add-clothes-btn"
              onClick={handleAddClick}
            >
              + Add clothes
            </button>
            <Link to="/profile" className="header__user-container">
              <p className="header__user-name">{currentUser?.name}</p>
              {currentUser?.avatar ? (
                <img
                  className="header__user-avatar"
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar-placeholder">{userInitial}</div>
              )}
            </Link>
          </>
        ) : (
          <>
            <button
              type="button"
              className="header__auth-btn"
              onClick={onSignUpClick}
            >
              Sign Up
            </button>
            <button
              type="button"
              className="header__auth-btn"
              onClick={onLogInClick}
            >
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
