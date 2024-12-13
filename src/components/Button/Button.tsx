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
  text,
  disabled,
  primary,
  confirmAction,
  children,
  onClick,
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
        disabled={disabled}
        className={generateButtonClasses()}
        onClick={onButtonClick}
      >
        {children ?? text}
      </button>

      {confirmAction && (
        <Modal title={"Are you sure?"} show={showModal} onClose={onModalClose}>
          <button onClick={onClick} className={styles["button"]}>
            Yes
          </button>

          <button onClick={onModalClose} className={styles["button"]}>
            No
          </button>
        </Modal>
      )}
    </>
  );
};

export default Button;
