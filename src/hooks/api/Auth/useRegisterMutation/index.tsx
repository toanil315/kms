import { UserRegister } from "@/data-model";
import { useMutation } from "react-query";
import { authServices } from "@/services";
import { toast } from "react-toastify";

const useRegisterMutation = () => {
  const { mutate, isLoading, isError, isSuccess } = useMutation(
    authServices.register,
    {
      onSuccess: () => {
        toast.success("Register successfully. Please login.");
      },
      onError: () => {
        toast.error("Register failed. Please try again.");
      },
    }
  );

  return {
    register: async (registerData: UserRegister) => {
      const result = await mutate(registerData);
      return result;
    },
    isLoading,
    isError,
    isSuccess,
  };
};

export default useRegisterMutation;
