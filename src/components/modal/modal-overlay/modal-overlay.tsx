import { PropsWithChildren } from "react";
import overlayStyles from "./modal-overlay.module.css";

type ModalOverlayProps = {
  onClose: () => void;
};

const ModalOverlay = ({
  onClose: onClose,
  children,
}: PropsWithChildren<ModalOverlayProps>) => (
  <div className={overlayStyles.modalBackdrop} onClick={onClose}>
    {children}
  </div>
);
export default ModalOverlay;
