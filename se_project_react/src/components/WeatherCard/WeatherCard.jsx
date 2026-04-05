import "./WeatherCard.css";
import { weatherIcons } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  const weatherIcon = weatherIcons.filter((icon) => {
    return (
      (icon.condition === weatherData.condition ||
        icon.condition === "fallback") &&
      icon.dayOrNight === weatherData.dayOrNight
    );
  });

  const weatherIconUrl = weatherIcon.length > 0 ? weatherIcon[0].url : null;
  const weatherIconAlt =
    weatherIcon.length > 0 ? weatherIcon[0].condition : "weather";

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F}°F</p>
      <img
        src={weatherIconUrl}
        alt={weatherIconAlt}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
