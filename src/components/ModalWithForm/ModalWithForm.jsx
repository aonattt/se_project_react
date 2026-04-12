import "./ModalWithForm.css";
import closeButton from "../../assets/formModalCloseButton.svg";

function ModalWithForm({
  children,
  buttonText,
  isOpen,
  title,
  name,
  handleCloseModal,
}) {
  return (
    <div className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          type="button"
          className="modal__close"
          onClick={() => handleCloseModal()}
        >
          <img src={closeButton} alt="Close Modal" />
        </button>
        <form className="modal__form" name={name}>
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
