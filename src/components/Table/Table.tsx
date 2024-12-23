import ButtonGroup from "../ButtonGroup/ButtonGroup";
import { Product } from "../../commonTypes";
import styles from "./Table.module.scss";

type DataProps = {
  data: Product[];
  onDelete: (id: string) => void;
  onShow: (show: boolean) => void;
  onSelect: (product: Product) => void;
  permissions: Set<unknown>;
};

const Table = ({ data, onDelete, onSelect, onShow }: DataProps) => {
  return (
    <table className={styles["table"]}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Currency</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ currency, id, name, price }: Product) => (
          <tr key={id}>
            <td>{name}</td>
            <td>{price}</td>
            <td>{currency}</td>
            <td>
              <ButtonGroup
                product={{ currency, id, name, price }}
                onSelect={onSelect}
                onDelete={onDelete}
                onShow={onShow}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
