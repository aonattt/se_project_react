import { useEffect } from "react";
import "./ModalWithForm.css";
import closeButton from "../../assets/formModalCloseButton.svg";

function ModalWithForm({
  children,
  buttonText,
  isOpen,
  title,
  name,
  handleCloseModal,
  onSubmit,
  altButtonText,
  onAltButtonClick,
  isValid = true,
}) {
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
      className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}
      onClick={handleOverlayClick}
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
        <form className="modal__form" name={name} onSubmit={onSubmit}>
          {children}

          <div className="modal__button-container">
            <button type="submit" className="modal__submit" disabled={!isValid}>
              {buttonText}
            </button>

            {altButtonText && (
              <button
                type="button"
                className="modal__secondary-btn"
                onClick={onAltButtonClick}
              >
                {altButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
