import { register, authorize, checkToken } from "../../utils/auth";
import { useState, useEffect } from "react";
import {
  coordinates,
  apiKey,
  defaultClothingItems,
} from "../../utils/constants";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getWeather, processWeatherData } from "../../utils/weatherApi";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import Profile from "../Profile/Profile";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { addItem } from "../../utils/api";
import { deleteItem } from "../../utils/api";
import { getItems } from "../../utils/api";
import { updateUser } from "../../utils/api";
import { addCardLike, removeCardLike } from "../../utils/api";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: " ",
    temp: {
      F: 999,
      C: 999,
    },
    city: " ",
    condition: " ",
    dayOrNight: " ",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authError, setAuthError] = useState(false);
  const navigate = useNavigate();
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

    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setActiveModal("");
    setAuthError(false);
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const onAddItem = (item, resetForm) => {
    addItem(item)
      .then((newItemFromServer) => {
        console.log("SERVER RETURNED:", newItemFromServer);
        setClothingItems((prevItems) => [newItemFromServer, ...prevItems]);
        resetForm();
        handleCloseModal();
      })
      .catch((err) => console.error(err));
  };

  const openConfirmationModal = () => {
    setActiveModal("confirm-delete");
  };

  const handleDeleteItem = (itemId) => {
    deleteItem(itemId)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemId),
        );
        handleCloseModal();
      })
      .catch((err) => console.error("Error deleting item:", err));
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((userData) => {
          setIsLoggedIn(true);
          setCurrentUser(userData);
        })
        .catch((err) => console.error("Token check failed:", err));
    }
  }, []);

  const handleLogin = ({ email, password }) => {
    authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          checkToken(data.token)
            .then((userData) => {
              setIsLoggedIn(true);
              setCurrentUser(userData);
              setAuthError(false);
              handleCloseModal();
            })
            .catch((err) => console.error(err));
        }
      })
      .catch((err) => {
        console.error("Login failed:", err);
        setAuthError(true);
      });
  };

  const handleRegistration = ({ name, avatar, email, password }) => {
    register(name, avatar, email, password)
      .then(() => {
        handleLogin({ email, password });
      })
      .catch((err) => console.error("Registration failed:", err));
  };

  const handleEditProfile = ({ name, avatar }) => {
    updateUser(name, avatar)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        handleCloseModal();
      })
      .catch((err) => console.error("Error updating profile:", err));
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item)),
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item)),
            );
          })
          .catch((err) => console.log(err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              onSignUpClick={() => setActiveModal("register")}
              onLogInClick={() => setActiveModal("login")}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      onEditProfileClick={() => setActiveModal("edit-profile")}
                      handleSignOut={handleSignOut}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />

            <ItemModal
              isOpen={activeModal === "preview"}
              handleCloseModal={handleCloseModal}
              card={selectedCard}
              onDeleteClick={openConfirmationModal}
            />
            <DeleteConfirmationModal
              isOpen={activeModal === "confirm-delete"}
              handleCloseModal={handleCloseModal}
              onDeleteClick={() =>
                handleDeleteItem(selectedCard._id || selectedCard.id)
              }
            />

            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onAddItem={onAddItem}
              onCloseModal={handleCloseModal}
            />
            <RegisterModal
              isOpen={activeModal === "register"}
              onCloseModal={handleCloseModal}
              handleRegistration={handleRegistration}
              onLogInClick={() => setActiveModal("login")}
            />
            <LoginModal
              isOpen={activeModal === "login"}
              onCloseModal={handleCloseModal}
              handleLogin={handleLogin}
              onSignUpClick={() => setActiveModal("register")}
              authError={authError}
            />
            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              onCloseModal={handleCloseModal}
              handleEditProfile={handleEditProfile}
            />
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
