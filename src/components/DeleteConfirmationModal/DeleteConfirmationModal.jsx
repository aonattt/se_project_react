import React from "react";
import closeButton from "../../assets/itemModalCloseButton.svg";
import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({ isOpen, handleCloseModal, onDeleteClick }) {
  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      onClick={handleCloseModal}
    >
      <div
        className="modal__content modal__content_type_confirmation"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal__close"
          onClick={handleCloseModal}
        >
          <img
            src={closeButton}
            alt="Close Modal"
            className="modal__close-icon"
          />
        </button>

        <div className="modal__confirmation-container">
          <p className="modal__confirmation-text">
            Are you sure you want to delete this item?
            <br />
            This action is irreversible.
          </p>

          <div className="modal__confirmation-buttons">
            <button
              type="button"
              className="modal__confirmation-btn"
              onClick={onDeleteClick}
            >
              Yes, delete item
            </button>
            <button
              type="button"
              className="modal__cancel-btn"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
