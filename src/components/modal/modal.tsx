import { createPortal } from "react-dom";
import modalStyles from "./modal.module.css";
import ModalOverlay from "./modal-overlay/modal-overlay";
import { PropsWithChildren, useEffect } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

type ModalProps = {
  isOpen: boolean;
  title?: string | null;
  onClose: () => void;
};

const Modal = ({
  isOpen,
  onClose,
  title = null,
  children,
}: PropsWithChildren<ModalProps>) => {
  const container = document.getElementById("modal-root");
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!container || !isOpen) return null;
  return createPortal(
    <>
      <ModalOverlay onClose={onClose}>
        <div
          className={modalStyles.modalMain}
          onClick={(e) => e.stopPropagation()}
        >
          {title ? (
            <div className={`${modalStyles.title} mt-10 ml-10 mr-10`}>
              <p className="text text_type_main-large">{title}</p>
              <CloseIcon
                className={modalStyles.cursorPointer}
                onClick={onClose}
                type="primary"
              />
            </div>
          ) : (
            <div className={modalStyles.closeButton}>
              <CloseIcon
                onClick={onClose}
                className={`${modalStyles.cursorPointer} mt-15 mr-10`}
                type="primary"
              />
            </div>
          )}

          <div
            className={`${modalStyles.modalContent} ${title ? "" : "mt-30"}`}
          >
            {children}
          </div>
        </div>
      </ModalOverlay>
    </>,
    container
  );
};
export default Modal;
