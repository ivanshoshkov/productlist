import { useState } from "react";
import { useGetPermissions } from "../../hooks/useGetPermissions";
import Button from "../Button/Button";
import Toast from "../Toast/Toast";
import ModalForm from "../Modal/ModalForm/ModalForm";
import { CREATE } from "../../constants";
import styles from "./ProductCreate.module.scss";

const ProductCreate = () => {
  const [showForm, setShowForm] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { permissions, error } = useGetPermissions();

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
        <Button onClick={onShowForm} text={getButtonLabel()} primary />
      )}

      {showForm && (
        <ModalForm
          showForm={showForm}
          onShowForm={onShowForm}
          setShowToast={setShowToast}
          setToastMessage={setToastMessage}
        />
      )}

      {showToast && (
        <Toast message={toastMessage} onClose={() => setShowToast(false)} />
      )}
    </div>
  );
};

export default ProductCreate;
