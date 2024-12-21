import { useQuery } from "react-query";

import { getPermissions } from "../services/permissionsServices";

export const useGetPermissions = () => {
  const {
    data: permissions,
    error,
    isLoading,
  } = useQuery({
    queryFn: getPermissions,
    queryKey: ["permissions"],
    refetchOnWindowFocus: false,
  });

  return { error, isLoading, permissions };
};
