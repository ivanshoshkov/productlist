import { ReactNode } from "react";
import styles from "./Modal.module.scss";
import Button from "../Button/Button";

type ModalProps = {
  children: ReactNode;
  title: string;
  show?: boolean;
  onClose?: () => void;
};

const Modal = ({ onClose, title, show, children }: ModalProps) => {
  return show ? (
    <div className={styles["modal"]}>
      <div className={styles["modal-content"]}>
        <div className={styles["modal-header"]}>
          <h2>{title}</h2>
          <Button text="Cancel" onClick={onClose} />
        </div>
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
