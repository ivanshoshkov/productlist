import { Product } from "../../../commonTypes";
import Form from "../../Form/Form";
import Modal from "../Modal";

type ModalFormProps = {
  showForm: boolean;
  onShowForm: () => void;
  setShowToast: (value: boolean) => void;
  setToastMessage: (message: string) => void;
  update?: boolean;
  product?: Product;
};

const ModalForm = ({
  onShowForm,
  product,
  setShowToast,
  setToastMessage,
  showForm,
  update,
}: ModalFormProps) => {
  
  const getFormTitle = () =>
    update ? "Update product" : "Create a new product";

  return (
    <Modal title={getFormTitle()} onClose={onShowForm} show={showForm}>
      <Form
        onClose={(message) => {
          onShowForm();
          if (message) {
            setShowToast(true);
            setToastMessage(message);
          }
        }}
        product={product}
        update={update}
      />
    </Modal>
  );
};

export default ModalForm;
