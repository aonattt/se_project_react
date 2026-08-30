import React, { useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./EditProfileModal.css";

const EditProfileModal = ({ isOpen, handleEditProfile, onCloseModal }) => {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, setValues } = useForm({
    name: "",
    avatar: "",
  });

  useEffect(() => {
    if (isOpen && currentUser) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditProfile(values);
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      name="edit-profile"
      isOpen={isOpen}
      handleCloseModal={onCloseModal}
      onSubmit={handleSubmit}
    >
      <div className="modal__input-group">
        <label htmlFor="edit-name" className="modal__label">
          Name *
        </label>
        <input
          className="modal__input"
          type="text"
          id="edit-name"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="modal__input-group">
        <label htmlFor="edit-avatar" className="modal__label">
          Avatar URL *
        </label>
        <input
          className="modal__input"
          type="url"
          id="edit-avatar"
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

export default EditProfileModal;
