import { useGetPermissions } from "../../hooks/useGetPermissions";
import { DELETE, UPDATE } from "../../constants";
import { Product } from "../../commonTypes";
import Button from "../Button/Button";

type ButtonGroupProps = {
  product: Product;
  onDelete: (id: string) => void;
  onShow: (show: boolean) => void;
  onSelect: (product: Product) => void;
};

const ButtonGroup = ({
  onDelete,
  onSelect,
  onShow,
  product,
}: ButtonGroupProps) => {
  const { error, permissions } = useGetPermissions();

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
        <Button onClick={onOpenModal} text="Update">
          <img src="./icons/edit.svg" alt="" />
        </Button>
      )}
      {permissions && permissions.has(DELETE) && (
        <Button
          onClick={() => onDelete(product.id!)}
          text="Delete"
          confirmAction
        >
          <img src="./icons/delete.svg" alt="" />
        </Button>
      )}
    </div>
  );
};

export default ButtonGroup;
