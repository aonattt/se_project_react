import React, { useState } from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import ItemModal from "../ItemModal/ItemModal";
import { getWeatherType } from "../../utils/weatherApi";

function Main({ weatherData, clothingItems }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle card click to open the modal
  const handleCardClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true); // Open the modal when an item is clicked
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null); // Optionally reset the selected item on modal close
  };

  // Null check for weatherData before accessing temperature
  if (!weatherData || !weatherData.temperature) {
    return <div>Loading weather data...</div>;
  }

  // Determine the weather type based on the current temperature
  const weatherType = getWeatherType(weatherData.temperature);
  console.log("Weather Type:", weatherType);

  // Filter clothing items based on the weather type
  const filteredClothingItems = clothingItems.filter(
    (item) => item.weather === weatherType
  );
  console.log(filteredClothingItems);

  return (
    <main className="main-content">
      <WeatherCard weatherData={weatherData} />
      <div className="main__title">
        <p>Today is {weatherData.temperature}°F / You may want to wear:</p>
      </div>
      <ul className="clothing-items-list">
        {filteredClothingItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            handleCardClick={handleCardClick}
          />
        ))}
      </ul>
      {isModalOpen && selectedItem && (
        <ItemModal
          onClose={handleCloseModal}
          selectedCard={selectedItem}
        />
      )}
    </main>
  );
}

export default Main;