import { useMutation, useQueryClient } from "react-query";
import { authServices } from "@/services";
import { toast } from "react-toastify";
import { localStorageClient } from "@/utils/localStorageClient";
import { ACCESS_TOKEN, QUERY_KEYS, REFRESH_TOKEN } from "@/utils/constants";
import { PATHS } from "@/routes/constants";
import { useRouter } from "@/hooks";
import { UserLogin } from "@/data-model/AuthTypes";

const useLoginMutation = () => {
  const { navigate } = useRouter();
  const client = useQueryClient();

  const { mutate, isLoading, isError, isSuccess } = useMutation(
    authServices.login,
    {
      onSuccess: (data) => {
        // Set tokens
        const date = new Date();
        const { access_token, refresh_token } = data.data;
        localStorageClient.setValue(ACCESS_TOKEN, access_token);
        localStorageClient.setValue(REFRESH_TOKEN, refresh_token);

        // Get user data
        client.refetchQueries(QUERY_KEYS.GET_ME);

        // Show Toast
        toast.success("Welcome back!");

        // Navigate to prev page
        if (window.history.state && window.history.state.idx > 0) {
          navigate(-1);
        } else {
          navigate(PATHS.HOME);
        }
      },
      onError: (error) => {
        toast.error("Login failed. Please try again");
      },
    }
  );

  return {
    login: async (loginData: UserLogin) => {
      return mutate(loginData);
    },
    isLoading,
    isError,
    isSuccess,
  };
};

export default useLoginMutation;
