export type Product = {
  name: string | undefined;
  price: number | undefined;
  currency: string | undefined;
  id: string;
};

export type ProductBodyProps = Omit<Product, "id">;