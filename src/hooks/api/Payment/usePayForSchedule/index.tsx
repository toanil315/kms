import { paymentServices } from "@/services";
import { useMutation } from "react-query";

const usePayForSchedule = () => {
  const { mutate, isLoading, isError, isSuccess } = useMutation(
    paymentServices.payForSchedule,
    {
      onSuccess: ({ data }) => {
        window.location.href = data.paymentUrl;
      },
    }
  );

  return {
    payForSchedule: (scheduleId?: string) => {
      if (scheduleId) {
        return mutate(scheduleId);
      }
    },
    isLoading,
    isError,
    isSuccess,
  };
};

export default usePayForSchedule;
