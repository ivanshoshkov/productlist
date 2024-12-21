import {
  ChangeEvent,
  FormEvent,
  memo,
  MouseEvent,
  useCallback,
  useState,
} from "react";
import { useMutation, useQueryClient } from "react-query";

import { createProduct, updateProduct } from "../../services/productServices";
import { Product, ProductBodyProps } from "../../commonTypes";
import { productMessages } from "../../constants";
import Button from "../Button/Button";
import Input from "../Input/Input";

type FormProps = {
  update?: boolean;
  product?: Product;
  onClose?: (message: string) => void;
};

type ProductMutationPayload = Product | ProductBodyProps;

const Form = ({ onClose, product, update }: FormProps) => {
  const [name, setName] = useState<string>(product?.name || "");
  const [price, setPrice] = useState<number | undefined>(
    product?.price || undefined
  );
  const [currency, setCurrency] = useState<string>(product?.currency || "");

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (product: ProductMutationPayload) => {
      if ("id" in product) {
        return updateProduct(product);
      }
      return createProduct(product);
    },
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

  const onCreate = useCallback(
    (event: FormEvent, product: ProductMutationPayload) => {
      event.preventDefault();

      try {
        mutate(product);
        onFormReset();
        onClose && onClose(productMessages[update ? "update" : "create"]);
      } catch (error) {
        console.log(error);
        onClose && onClose("Failed to create product");
      }
    },
    []
  );

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

  const determineChanges = () =>
    product?.currency !== currency ||
    product?.name !== name ||
    product?.price !== price;

  return (
    <form
      onSubmit={(event) =>
        onCreate(event, {
          currency,
          name,
          price,
        })
      }
    >
      <Input
        placeholder="Enter product name"
        onChange={onNameChange}
        value={name}
        label="Name"
        type="text"
        name="name"
      />

      <Input
        placeholder="Enter product price"
        onChange={onPriceChange}
        value={price}
        type="number"
        label="Price"
        name="price"
      />

      <Input
        placeholder="Enter currency"
        onChange={onCurrencyChange}
        value={currency}
        label="Currency"
        name="currency"
        type="text"
      />

      <div>
        <Button
          onClick={(event: MouseEvent) =>
            onCreate(event, {
              currency,
              name,
              price,
              ...(update && product && { id: product.id }),
            })
          }
          disabled={!validateFields() || !determineChanges()}
          text={update ? "Update" : "Create"}
          primary
        />
      </div>
    </form>
  );
};

export default memo(Form);
