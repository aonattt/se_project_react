import React, { useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import './AddItemModal.css';

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const [name, setName] = useState('');
  const [imageUrl, setLink] = useState('');
  const [weather, setweather] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleImageChange = (e) => {
    setLink(e.target.value);
  };
  const handleWeatherChange = (e) => {
    setweather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !weather || !imageUrl) {
      alert("Please fill out all fields.");
      return;
    }
    onAddItem({ name, weather, imageUrl });
    setName('');  // Clear the form after submission
    setLink('');  // Clear the form
    setweather('');  // Clear the form
    onCloseModal();  // Close the modal
  };

  return (
    <ModalWithForm
      title="New clothes"
      name="clothes"
      buttonText="Add clothes"
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      isOpen={isOpen}
    >
      <div className="modal__input">
        Name
        <input
          id="modal__input-name"
          className="modal__input-form"
          name="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </div>
      <span className=""></span>
      {/* Image URL Input */}
      <div className="modal__input">
        Image
        <input
          id="modal__input-url"
          className="modal__input-form"
          name="link"
          type="url"
          placeholder="Image URL"
          value={imageUrl}
          onChange={handleImageChange}
          required
        />
      </div>
      <span className=""></span>
      {/* Select weather and radio inputs */}
      <p className="modal__radio-title">Select weather type:</p>
      <div className="modal__radio-container">
        <div className="radio__btn-container">
          <input
            className="radio__btns"
            type="radio"
            id="radioA"
            name="weather_temp"
            onChange={handleWeatherChange}
            value="hot"
            required  // Add required here to enforce selection
          />
          <label htmlFor="radioA" className="radio__btn-label">
            Hot
          </label>
        </div>
        <div className="radio__btn-container">
          <input
            className="radio__btns"
            type="radio"
            id="radioB"
            name="weather_temp"
            onChange={handleWeatherChange}
            value="warm"
          />
          <label htmlFor="radioB" className="radio__btn-label">
            Warm
          </label>
        </div>
        <div className="radio__btn-container">
          <input
            className="radio__btns"
            type="radio"
            id="radioC"
            name="weather_temp"
            onChange={handleWeatherChange}
            value="cold"
          />
          <label htmlFor="radioC" className="radio__btn-label">
            Cold
          </label>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
