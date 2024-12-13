import { useQuery } from "react-query";
import { getPermissions } from "../services/permissionsServices";

export const useGetPermissions = () => {
  const {
    data: permissions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["permissions"],
    queryFn: getPermissions,
    refetchOnWindowFocus: false,
  });

  return { permissions, isLoading, error };
};
