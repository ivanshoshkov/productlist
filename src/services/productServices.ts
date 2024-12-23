import { Product, ProductBodyProps } from "../commonTypes";
import { BASE_URL } from "../constants";

export const getProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: "GET",
    });
    return response.json();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch products");
  }
};

export const deleteProduct = async (id: string) => {
  try {
    await fetch(`${BASE_URL}/products/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete product");
  }
};

export const createProduct = async (product: ProductBodyProps) => {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      body: JSON.stringify(product),

      method: "POST",
    });

    return response.json();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create product");
  }
};

export const updateProduct = async (product: Product) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${product.id}`, {
      body: JSON.stringify(product),
      method: "PUT",
    });

    return response.json();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update product");
  }
};
