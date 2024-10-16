import React, { useState } from "react";
import "./Main.css";
// Import the WeatherCard and ItemCard components
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import ItemModal from "../ItemModal/ItemModal";
import { getWeatherType } from "../../utils/weatherApi";

function Main({ weatherData, clothingItems }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(clothingItems);
  const handleCardClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true); // Open the modal when an item is clicked
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null); // Optionally reset the selected item on modal close
  };
  // Determine the weather type based on the current temperature
  const weatherType = weatherData
    ? getWeatherType(weatherData.temperature)
    : "cold";
  console.log("Weather Type:", weatherType);

  // Filter clothing items based on the weather type//
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
          //handleOpenConfirm={/* Define or pass your delete confirmation function here */}
        />
      )}
    </main>
  );
}

export default Main;
