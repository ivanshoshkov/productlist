import { memo, useState } from "react";
import { deleteProduct, getProducts } from "../../services/productServices";
import { useQuery, useQueryClient } from "react-query";
import { useGetPermissions } from "../../hooks/useGetPermissions";
import Toast from "../Toast/Toast";
import ModalForm from "../Modal/ModalForm/ModalForm";
import Table from "../Table/Table";
import styles from "./ProductList.module.scss";
import { READ } from "../../constants";
import { Product } from "../../commonTypes";

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

  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    refetchOnWindowFocus: false,
  });

  const onDelete = async (id: string) => {
    try {
      await deleteProduct(id);

      queryClient.invalidateQueries("products");

      setShowToast(true);

      setToastMessage("Product deleted successfully");
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  const onModalClose = () => {
    setShowModal(false);
  };

  return isReadPermission ? (
    <div className={styles["product-list"]}>
      {isLoading && <p>Loading...</p>}

      {error && <p>Error: {JSON.stringify(error)}</p>}

      {data && data.length > 0 && (
        <Table
          data={data}
          onDelete={onDelete}
          onShow={setShowModal}
          onSelect={setSelectedProduct}
          permissions={permissions}
        />
      )}

      {showModal && (
        <ModalForm
          showForm={showModal}
          onShowForm={onModalClose}
          setShowToast={setShowToast}
          setToastMessage={setToastMessage}
          product={selectedProduct}
          update
        />
      )}

      {showToast && (
        <Toast onClose={() => setShowToast(false)} message={toastMessage} />
      )}
    </div>
  ) : (
    <div>
      <p className="error-message">
        You either dont have permissions to see this page or something went
        wrong while requesting products.
      </p>
    </div>
  );
};

export default memo(ProductList);
