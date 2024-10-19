import React, { useEffect } from "react";
import './ModalWithForm.css';

const ModalWithForm = ({
  children,
  title,
  name,
  buttonText,
  onClose,
  onSubmit,
  isOpen,
}) => {
  // Close modal on Escape key press
  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    
    // Add event listener on mount
    if (isOpen) {
      window.addEventListener("keydown", handleEscClose);
    }

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen, onClose]);

  return (
    <section
      className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`} // Toggle visibility
      onClick={onClose} // Close when clicking outside modal content
    >
      <div className="modal__container" onClick={(e) => e.stopPropagation()}> {/* Prevent modal close on click inside */}
        <button className="modal__exit" type="button" onClick={onClose} />
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" name={name} onSubmit={onSubmit}>
          <fieldset className="modal__fieldset">{children}</fieldset>
          <span className="modal__error"></span>
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ModalWithForm;