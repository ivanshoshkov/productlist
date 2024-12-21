import { useQuery, useQueryClient } from "react-query";
import { memo, useState } from "react";

import {
  PERMISSION_ERROR_MESSAGE,
  productMessages,
  READ,
} from "../../constants";
import { deleteProduct, getProducts } from "../../services/productServices";
import { useGetPermissions } from "../../hooks/useGetPermissions";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ModalForm from "../Modal/ModalForm/ModalForm";
import styles from "./ProductList.module.scss";
import { Product } from "../../commonTypes";
import Toast from "../Toast/Toast";
import Table from "../Table/Table";

const ProductList = () => {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );

  const { permissions } = useGetPermissions();
  const isReadPermission = permissions && permissions.has(READ);

  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryFn: getProducts,
    queryKey: ["products"],
    refetchOnWindowFocus: false,
  });

  if (!isReadPermission) {
    return isLoading ? null : (
      <ErrorMessage message={PERMISSION_ERROR_MESSAGE} />
    );
  }

  const onDelete = async (id: string) => {
    try {
      await deleteProduct(id);

      queryClient.invalidateQueries("products");

      setShowToast(true);

      setToastMessage(productMessages.delete);
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  const onModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className={styles["product-list"]}>
      {isLoading && <p>Loading...</p>}

      {error && <p>Error: {JSON.stringify(error)}</p>}

      {data && data.length > 0 && (
        <Table
          onSelect={setSelectedProduct}
          permissions={permissions}
          onShow={setShowModal}
          onDelete={onDelete}
          data={data}
        />
      )}

      {showModal && (
        <ModalForm
          setToastMessage={setToastMessage}
          setShowToast={setShowToast}
          product={selectedProduct}
          onShowForm={onModalClose}
          showForm={showModal}
          update
        />
      )}

      {showToast && (
        <Toast onClose={() => setShowToast(false)} message={toastMessage} />
      )}
    </div>
  );
};

export default memo(ProductList);
