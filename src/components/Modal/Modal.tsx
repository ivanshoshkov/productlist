import { ReactNode } from "react";

import styles from "./Modal.module.scss";
import Button from "../Button/Button";

type ModalProps = {
  children: ReactNode;
  title: string;
  show?: boolean;
  onClose?: () => void;
};

const Modal = ({ children, onClose, show, title }: ModalProps) => {
  return show ? (
    <div className={styles["modal"]}>
      <div className={styles["modal-content"]}>
        <div className={styles["modal-header"]}>
          <h2>{title}</h2>
          <Button onClick={onClose} text="Cancel" />
        </div>
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
