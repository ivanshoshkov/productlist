import Button from "../Button/Button";
import { DELETE, UPDATE } from "../../constants";
import { Product } from "../../commonTypes";
import { useGetPermissions } from "../../hooks/useGetPermissions";

type ButtonGroupProps = {
  product: Product;
  onDelete: (id: string) => void;
  onShow: (show: boolean) => void;
  onSelect: (product: Product) => void;
};

const ButtonGroup = ({
  product,
  onDelete,
  onShow,
  onSelect,
}: ButtonGroupProps) => {
  const { permissions, error } = useGetPermissions();

  const onOpenModal = () => {
    onSelect(product);
    onShow(true);
  };
  return error ? (
    <p className="error-message">
      There was a problem loading your permissions
    </p>
  ) : (
    <div>
      {permissions && permissions.has(UPDATE) && (
        <Button text="Update" onClick={onOpenModal}>
          <img src="./icons/edit.svg" alt="" />
        </Button>
      )}
      {permissions && permissions.has(DELETE) && (
        <Button
          text="Delete"
          onClick={() => onDelete(product.id!)}
          confirmAction
        >
          <img src="./icons/delete.svg" alt="" />
        </Button>
      )}
    </div>
  );
};

export default ButtonGroup;
