import "./Header.css";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/Ellipse 18.svg";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Header Logo" />
      <p className="header__date_location">
        {currentDate}, {weatherData?.city}
      </p>
      <button
        type="button"
        className="header__add-clothes-btn"
        onClick={handleAddClick}
      >
        + Add clothes
      </button>
      <div className="header__user-container">
        <p className="header__user-name">Aykut Onat</p>
        <img className="header__user-avatar" src={avatar} alt="User Avatar" />
      </div>
    </header>
  );
}

export default Header;
