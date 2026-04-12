import "./ItemModal.css";
import closeButton from "../../assets/itemModalCloseButton.svg";

function ItemModal({ isOpen, handleCloseModal, card }) {
  return (
    <div className={`modal ${isOpen ? "modal__opened" : ""}`}>
      <div className="modal__content_type_image">
        <button
          type="button"
          className="modal__close"
          onClick={() => handleCloseModal()}
        >
          <img src={closeButton} alt="Close Modal" />
        </button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather : {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
