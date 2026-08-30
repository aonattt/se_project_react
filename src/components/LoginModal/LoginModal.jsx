import React, { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import "./LoginModal.css";

const LoginModal = ({
  isOpen,
  handleLogin,
  onCloseModal,
  onSignUpClick,
  authError,
}) => {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isOpen) {
      setValues({ email: "", password: "" });
    }
  }, [isOpen, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(values);
  };

  const isValid = values.email.trim() !== "" && values.password.trim() !== "";

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      name="login"
      isOpen={isOpen}
      handleCloseModal={onCloseModal}
      onSubmit={handleSubmit}
      altButtonText="or Sign Up"
      onAltButtonClick={onSignUpClick}
      isValid={isValid}
    >
      <div className="modal__input-group">
        <label htmlFor="login-email" className="modal__label">
          Email
        </label>
        <input
          className="modal__input"
          type="email"
          id="login-email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="modal__input-group">
        <label htmlFor="login-password" className="modal__label">
          {authError ? "Incorrect password" : "Password"}
        </label>
        <input
          className="modal__input"
          type="password"
          id="login-password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </div>

      {authError && (
        <span className="modal__error-message">
          Email or password incorrect
        </span>
      )}
    </ModalWithForm>
  );
};

export default LoginModal;
