import React, { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import "./AddItemModal.css";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const { values, handleChange, setValues } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  useEffect(() => {
    if (isOpen) {
      setValues({ name: "", imageUrl: "", weather: "" });
    }
  }, [isOpen, setValues]);

  const handleReset = () => {
    setValues({ name: "", imageUrl: "", weather: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(values, handleReset);
  };

  const isValid =
    values.name.trim() !== "" &&
    values.imageUrl.trim() !== "" &&
    values.weather !== "";

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      name="add-garment"
      isOpen={isOpen}
      handleCloseModal={onCloseModal}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <div className="modal__input-group">
        <label htmlFor="name" className="modal__label">
          Name{" "}
        </label>
        <input
          className="modal__input"
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
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
          name="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
        />
      </div>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type :</legend>

        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            className="modal__radio-input"
            type="radio"
            id="hot"
            name="weather"
            value="hot"
            onChange={handleChange}
          />
          Hot
        </label>

        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            className="modal__radio-input"
            type="radio"
            id="warm"
            name="weather"
            value="warm"
            onChange={handleChange}
          />
          Warm
        </label>

        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            className="modal__radio-input"
            type="radio"
            id="cold"
            name="weather"
            value="cold"
            onChange={handleChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
