import { useQuery } from "react-query";
import { UserType } from "@/data-model/UserTypes";
import { authServices } from "@/services";
import { ACCESS_TOKEN, QUERY_KEYS } from "@/utils/constants";
import { localStorageClient } from "@/utils/localStorageClient";

const useUser = (): {
  user?: UserType;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
} => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    QUERY_KEYS.GET_ME,
    authServices.getMe,
    {
      enabled: Boolean(localStorageClient.readValue(ACCESS_TOKEN)),
    }
  );

  return {
    user: data?.data,
    isLoading,
    isError,
    isSuccess,
  };
};

export default useUser;
