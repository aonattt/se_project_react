import "./ModalWithForm.css";
import closeButton from "../../assets/formModalCloseButton.svg";

function ModalWithForm({
  activeModal,
  children,
  buttonText,
  title,
  handleCloseModal,
}) {
  return (
    <div
      className={`modal ${activeModal && activeModal === "addGarment" ? "modal__opened" : ""}`}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          type="button"
          className="modal__close"
          onClick={() => handleCloseModal()}
        >
          <img src={closeButton} alt="Close Modal" />
        </button>
        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
