import React, { useState, useEffect } from "react";
import "./App.css";
import "../ModalWithForm/ModalWithForm.css";
import "../ItemModal/ItemModal.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal"; // Import ItemModal
import AddItemModal from "../AddItemModal/AddItemModal";
import { fetchWeatherData } from "../../utils/weatherApi";
import { defaultClothingItems } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "../Profile/Profile";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { deleteItems, getItems, postItems } from "../../utils/Api";

function App() {
  const [modalOpened, setModalOpened] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState(false);
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [selectedItem, setSelectedItem] = useState(null); 
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [location, setLocation] = useState("");

  // Close the modal
  const closeModal = () => {
    setModalOpened("");
  };

  // Fetch clothing items from API
  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Fetch weather data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWeatherData();
        setWeatherData(data);
        setWeatherLoading(false);
      } catch (error) {
        setWeatherError(true);
        setWeatherLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (modalOpened) {
      window.addEventListener("keydown", handleEscClose);
    } else {
      window.removeEventListener("keydown", handleEscClose);
    }
  
    // Cleanup the event listener on unmount
    return () => window.removeEventListener("keydown", handleEscClose);
  }, [modalOpened]);

  const handleCloseModal = (e) => {
    if (e && e.target === e.currentTarget) {
      setModalOpened("");
    }
  };

  const handleEscClose = (e) => {
    if (e.key === "Escape") {
      setModalOpened("");
    }
  };

  const handleDeleteCard = (cardElement) => {
    deleteItems(cardElement)
      .then(() => {
        const newClothesList = clothingItems.filter((cards) => {
          return cards.id !== cardElement;
        });
        setClothingItems(newClothesList);
        closeModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOpenModal = () => {
    setModalOpened("new-clothes-modal");
  };

  const handleOpenConfirmationModal = () => {
    setModalOpened("confirmation-opened");
  };

  const handleSelectedCard = (card) => {
    setModalOpened("open");
    setSelectedCard(card);
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item);
  };

  const handleCloseItemModal = () => {
    setSelectedItem(null);
  };

  const onAddItem = (values) => {
    postItems(values)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        closeModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <BrowserRouter>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="App">
            {/* Handle weather loading and error states */}
            {weatherLoading ? (
              <div>Loading weather data...</div>
            ) : weatherError ? (
              <div>Error loading weather data. Please try again later.</div>
            ) : (
              <>
                <Header weatherData={weatherData} onAddClick={handleOpenModal} />
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Main
                        weatherData={weatherData}
                        clothingItems={clothingItems}
                        onItemSelect={handleItemSelect}
                      />
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <Profile
                        onSelectCard={handleSelectedCard}
                        openAddClothesModal={handleOpenModal}
                        clothingItems={clothingItems}
                      />
                    }
                  />
                </Routes>

                <Footer />
                {modalOpened === "open" && (
                  <ItemModal
                    onClose={handleCloseModal}
                    selectedCard={selectedCard}
                    handleOpenConfirm={handleOpenConfirmationModal}
                  />
                )}

                {modalOpened === "confirmation-opened" && (
                  <DeleteConfirmationModal
                    onClose={handleCloseModal}
                    card={selectedCard}
                    handleDeleteCard={handleDeleteCard}
                  />
                )}
                {modalOpened === "new-clothes-modal" && (
                  <AddItemModal
                    isOpen={modalOpened === "new-clothes-modal"}
                    onAddItem={onAddItem}
                    onCloseModal={handleCloseModal}
                  />
                )}

                {modalOpened && (
                  <ModalWithForm
                    title="Add Clothing Item"
                    name="addClothing"
                    buttonText="Submit"
                    onClose={handleCloseModal}
                  />
                )}

                {selectedItem && (
                  <ItemModal item={selectedItem} onClose={handleCloseItemModal} />
                )}
              </>
            )}
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
