import "./ItemModal.css";

const ItemModal = ({ onClose, selectedCard, handleOpenConfirm }) => {
  return (
    <section className="modal" onClick={onClose}>
      <div className="modal__container item__modal-container">
        <button
          className="modal__exit"
          type="button"
          onClick={onClose}
        ></button>
        <div className="item__modal">
          <p className="item__modal-title">{selectedCard.name}</p>
          <img
            className="item__modal-image"
            alt={selectedCard.name}
            src={selectedCard.imageUrl}
          />
        </div>
        <p className="item__modal-weather">Weather: {selectedCard.weather}</p>
        <button
          className="item__modal-delete_button"
          type="button"
          onClick={handleOpenConfirm}
        >
          Delete item
        </button>
      </div>
    </section>
  );
};

export default ItemModal;
