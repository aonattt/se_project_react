import React, { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import "./RegisterModal.css";

const RegisterModal = ({
  isOpen,
  handleRegistration,
  onCloseModal,
  onLogInClick,
}) => {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  useEffect(() => {
    if (isOpen) {
      setValues({ email: "", password: "", name: "", avatar: "" });
    }
  }, [isOpen, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(values);
  };

  const isValid =
    values.email.trim() !== "" &&
    values.password.trim() !== "" &&
    values.name.trim() !== "" &&
    values.avatar.trim() !== "";

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      name="register"
      isOpen={isOpen}
      handleCloseModal={onCloseModal}
      onSubmit={handleSubmit}
      altButtonText="or Log In"
      onAltButtonClick={onLogInClick}
      isValid={isValid}
    >
      <div className="modal__input-group">
        <label htmlFor="register-email" className="modal__label">
          Email *
        </label>
        <input
          className="modal__input"
          type="email"
          id="register-email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="modal__input-group">
        <label htmlFor="register-password" className="modal__label">
          Password *
        </label>
        <input
          className="modal__input"
          type="password"
          id="register-password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="modal__input-group">
        <label htmlFor="register-name" className="modal__label">
          Name *
        </label>
        <input
          className="modal__input"
          type="text"
          id="register-name"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="modal__input-group">
        <label htmlFor="register-avatar" className="modal__label">
          Avatar URL *
        </label>
        <input
          className="modal__input"
          type="url"
          id="register-avatar"
          name="avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
