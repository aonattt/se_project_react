import "./Header.css";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/Ellipse 18.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
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

        <button
          type="button"
          className="header__add-clothes-btn"
          onClick={handleAddClick}
        >
          + Add clothes
        </button>
        <Link to="/profile" className="header__user-container">
          <p className="header__user-name">Aykut Onat</p>
          <img className="header__user-avatar" src={avatar} alt="User Avatar" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
