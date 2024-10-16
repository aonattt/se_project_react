import React from "react";
import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  if (!weatherData) {
    return <div>Loading weather data...</div>;
  }

  const {
    temperature,
    conditionType = "sunny",
    isDaytime = true,
  } = weatherData;

  // Find the matching weather condition in weatherOptions
  const conditionInfo = weatherOptions.find(
    (option) => option.type === conditionType && option.day === isDaytime
  );

  // If no matching condition is found, provide a default image source or handle it
  const imgSrc = conditionInfo ? conditionInfo.url : "default-image-path.jpg";

  return (
    <div className="weather-card">
      <div className="weather-image-container">
        <p className="temperature-text">{temperature}°F</p>
        <img
          className="weather-image"
          src={imgSrc}
          alt={conditionType || "Weather"}
        />
      </div>
    </div>
  );
}

export default WeatherCard;
