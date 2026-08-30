import { useEffect, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemModal.css";
import closeButton from "../../assets/itemModalCloseButton.svg";

function ItemModal({ isOpen, handleCloseModal, card, onDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser?._id;

  const itemDeleteButtonClassName = `modal__delete-btn ${
    isOwn ? "" : "modal__delete-btn_hidden"
  }`;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleCloseModal]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__content_type_image">
        <button
          type="button"
          className="modal__close"
          onClick={() => handleCloseModal()}
        >
          <img
            src={closeButton}
            alt="Close Modal"
            className="modal__close-icon"
          />
        </button>
        <img
          src={card.imageUrl || card.link}
          alt={card.name}
          className="modal__image"
        />
        <div className="modal__footer">
          <div>
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <button
            type="button"
            className={itemDeleteButtonClassName}
            onClick={onDeleteClick}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
