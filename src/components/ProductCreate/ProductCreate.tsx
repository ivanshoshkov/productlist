import { useState } from "react";

import { useGetPermissions } from "../../hooks/useGetPermissions";
import ModalForm from "../Modal/ModalForm/ModalForm";
import styles from "./ProductCreate.module.scss";
import { CREATE } from "../../constants";
import Button from "../Button/Button";
import Toast from "../Toast/Toast";

const ProductCreate = () => {
  const [showForm, setShowForm] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { error, permissions } = useGetPermissions();

  const onShowForm = () => {
    setShowForm((prev) => !prev);
  };

  const getButtonLabel = () => (showForm ? "Close" : "Create");

  return error ? (
    <p className="error-message">
      There was a problem with loading the permissions
    </p>
  ) : (
    <div className={styles["product-create"]}>
      {permissions && permissions.has(CREATE) && (
        <Button text={getButtonLabel()} onClick={onShowForm} primary />
      )}

      {showForm && (
        <ModalForm
          setToastMessage={setToastMessage}
          setShowToast={setShowToast}
          onShowForm={onShowForm}
          showForm={showForm}
        />
      )}

      {showToast && (
        <Toast onClose={() => setShowToast(false)} message={toastMessage} />
      )}
    </div>
  );
};

export default ProductCreate;
