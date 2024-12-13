import { BASE_URL } from "../constants";

type Permission = {
  id: string;
  name: string;
};

export const getPermissions = async () => {
  try {
    const response = await fetch(`${BASE_URL}/permissions`, {
      method: "GET",
    });

    const data: Permission[] = await response.json();

    const permissions = new Set(data.map((permission) => permission.name));

    return permissions;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch permissions");
  }
};
