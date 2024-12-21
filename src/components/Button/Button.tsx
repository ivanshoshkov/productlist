import { MouseEvent, ReactNode, useState } from "react";

import styles from "./Button.module.scss";
import Modal from "../Modal/Modal";

type ButtonProps = {
  text: string;
  primary?: boolean;
  disabled?: boolean;
  confirmAction?: boolean;
  children?: ReactNode;
  onClick?: (event: MouseEvent) => void;
};

const Button = ({
  children,
  confirmAction,
  disabled,
  onClick,
  primary,
  text,
}: ButtonProps) => {
  const [showModal, setShowModal] = useState(false);

  const onButtonClick = (event: MouseEvent) => {
    if (confirmAction) {
      setShowModal(true);
    } else if (onClick) {
      onClick(event);
    }
  };

  const onModalClose = () => setShowModal(false);

  const generateButtonClasses = () => {
    return [
      primary ? styles["button-primary"] : styles["button"],
      disabled && styles["disabled"],
    ].join(" ");
  };

  return (
    <>
      <button
        className={generateButtonClasses()}
        onClick={onButtonClick}
        disabled={disabled}
      >
        {children ?? text}
      </button>

      {confirmAction && (
        <Modal title={"Are you sure?"} onClose={onModalClose} show={showModal}>
          <button className={styles["button"]} onClick={onClick}>
            Yes
          </button>

          <button className={styles["button"]} onClick={onModalClose}>
            No
          </button>
        </Modal>
      )}
    </>
  );
};

export default Button;
