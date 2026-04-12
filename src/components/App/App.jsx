import { useState, useEffect } from "react";
import {
  coordinates,
  apiKey,
  defaultClothingItems,
} from "../../utils/constants";
import { getWeather, processWeatherData } from "../../utils/weatherApi";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: " ",
    temp: { F: 999 },
    city: " ",
    condition: " ",
    dayOrNight: " ",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  useEffect(() => {
    getWeather({
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      apiKey,
    })
      .then((data) => {
        const processedData = processWeatherData(data);
        setWeatherData(processedData);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleAddClick = () => {
    setActiveModal("addGarment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main
          weatherData={weatherData}
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
        />
        <Footer />
        <ModalWithForm
          buttonText="Add garment"
          title="New garment"
          name="add-garment"
          isOpen={activeModal === "addGarment"}
          handleCloseModal={handleCloseModal}
        >
          <div className="modal__input-group">
            <label htmlFor="name" className="modal__label">
              Name{" "}
            </label>
            <input
              className="modal__input"
              type="text"
              id="name"
              placeholder="Name"
            />
          </div>
          <div className="modal__input-group">
            <label htmlFor="imageUrl" className="modal__label">
              Image{" "}
            </label>
            <input
              className="modal__input"
              type="url"
              id="imageUrl"
              placeholder="Image URL"
            />
          </div>
          <fieldset className="modal__radio-buttons">
            <legend className="modal__legend">Select the weather type :</legend>
            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
              <input
                className="modal__radio-input"
                type="radio"
                id="hot"
                name="category"
                value="Hot"
              />
              Hot
            </label>
            <label
              htmlFor="warm"
              className="modal__label modal__label_type_radio"
            >
              <input
                className="modal__radio-input"
                type="radio"
                id="warm"
                name="category"
                value="Warm"
              />
              Warm
            </label>

            <label
              htmlFor="cold"
              className="modal__label modal__label_type_radio"
            >
              <input
                className="modal__radio-input"
                type="radio"
                id="cold"
                name="category"
                value="Cold"
              />
              Cold
            </label>
          </fieldset>
        </ModalWithForm>
        <ItemModal
          isOpen={activeModal === "preview"}
          handleCloseModal={handleCloseModal}
          card={selectedCard}
        />
      </div>
    </div>
  );
}

export default App;
