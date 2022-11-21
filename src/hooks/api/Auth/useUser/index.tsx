import { useQuery } from "react-query";
import { UserType } from "@/data-model/UserTypes";
import { authServices } from "@/services";
import { QUERY_KEYS } from "@/utils/constants";

const useUser = (): {
  user?: UserType;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
} => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    QUERY_KEYS.GET_ME,
    authServices.getMe
  );

  return {
    user: data?.data,
    isLoading,
    isError,
    isSuccess,
  };
};

export default useUser;
