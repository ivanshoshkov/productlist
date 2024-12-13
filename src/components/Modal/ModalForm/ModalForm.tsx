import Modal from "../Modal";
import Form from "../../Form/Form";
import { Product } from "../../../commonTypes";

type ModalFormProps = {
  showForm: boolean;
  onShowForm: () => void;
  setShowToast: (value: boolean) => void;
  setToastMessage: (message: string) => void;
  update?: boolean;
  product?: Product;
};

const ModalForm = ({
  showForm,
  onShowForm,
  setShowToast,
  setToastMessage,
  product,
  update,
}: ModalFormProps) => {
  return (
    <Modal title={"Create a new product"} show={showForm} onClose={onShowForm}>
      <Form
        update={update}
        product={product}
        onClose={(message) => {
          onShowForm();
          if (message) {
            setShowToast(true);
            setToastMessage(message);
          }
        }}
      />
    </Modal>
  );
};

export default ModalForm;
