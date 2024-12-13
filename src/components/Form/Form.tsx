import {
  ChangeEvent,
  FormEvent,
  memo,
  MouseEvent,
  useCallback,
  useState,
} from "react";
import Input from "../Input/Input";
import { createProduct, updateProduct } from "../../services/productServices";
import { useMutation, useQueryClient } from "react-query";
import Button from "../Button/Button";
import { Product } from "../../commonTypes";

type FormProps = {
  update?: boolean;
  product?: Product;
  onClose?: (message: string) => void;
};
const Form = ({ product, update, onClose }: FormProps) => {
  const [name, setName] = useState<string>(product?.name || "");
  const [price, setPrice] = useState<number | undefined>(
    product?.price || undefined
  );
  const [currency, setCurrency] = useState<string>(product?.currency || "");

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (product: Product) =>
      update ? updateProduct(product) : createProduct(product),
    mutationKey: ["addProduct"],
    onSuccess: (newProduct) => {
      if (update) {
        queryClient.invalidateQueries("products");
      } else {
        queryClient.setQueryData<Product[]>("products", (oldProducts) => [
          ...(oldProducts || []),
          newProduct,
        ]);
      }
    },
  });

  const onCreate = useCallback((event: FormEvent, product: Product) => {
    event.preventDefault();

    try {
      mutate(product);
      onFormReset();
      onClose &&
        onClose(`Product ${update ? "updated" : "created"} successfully`);
    } catch (error) {
      console.log(error);
      onClose && onClose("Failed to create product");
    }
  }, []);

  const onFormReset = useCallback(() => {
    setName("");
    setPrice(0);
    setCurrency("");
  }, []);

  const onNameChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      setName(target.value);
    },
    []
  );

  const onPriceChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      setPrice(Number(target.value));
    },
    []
  );

  const onCurrencyChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      setCurrency(target.value);
    },
    []
  );

  const validateFields = () =>
    Boolean(name && (price || price === 0) && currency);

  const determineChanges = () => {
    if (
      product?.currency !== currency ||
      product?.name !== name ||
      product?.price !== price
    ) {
      return true;
    }

    return false;
  };

  return (
    <form
      onSubmit={(event) =>
        onCreate(event, {
          name,
          price,
          currency,
        })
      }
    >
      <Input
        label="Name"
        name="name"
        type="text"
        value={name}
        placeholder="Enter product name"
        onChange={onNameChange}
      />

      <Input
        label="Price"
        name="price"
        type="number"
        value={price}
        placeholder="Enter product price"
        onChange={onPriceChange}
      />

      <Input
        label="Currency"
        name="currency"
        type="text"
        value={currency}
        placeholder="Enter currency"
        onChange={onCurrencyChange}
      />

      <div>
        <Button
          primary
          disabled={!validateFields() || !determineChanges()}
          text={update ? "Update" : "Create"}
          onClick={(event: MouseEvent) =>
            onCreate(event, { name, price, currency, id: product?.id })
          }
        />
      </div>
    </form>
  );
};

export default memo(Form);
