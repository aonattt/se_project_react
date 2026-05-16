import "./WeatherCard.css";
import { weatherIcons } from "../../utils/constants";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const weatherIcon = weatherIcons.find((icon) => {
    return (
      (icon.condition === weatherData.condition ||
        icon.condition === "fallback") &&
      icon.dayOrNight === weatherData.dayOrNight
    );
  });

  const weatherIconUrl = weatherIcon ? weatherIcon.url : null;
  const weatherIconAlt = weatherIcon ? weatherIcon.condition : "weather";

  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {currentTemperatureUnit === "C"
          ? `${weatherData.temp.C}°C`
          : `${weatherData.temp.F}°F`}
      </p>
      <img
        src={weatherIconUrl}
        alt={weatherIconAlt}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
