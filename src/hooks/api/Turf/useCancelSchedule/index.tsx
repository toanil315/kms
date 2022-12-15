import { ScheduleType } from "@/data-model";
import { turfServices } from "@/services";
import { QUERY_KEYS } from "@/utils/constants";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

const useCancelSchedule = () => {
  const client = useQueryClient();
  const { mutate, isLoading, isError } = useMutation(
    turfServices.cancelSchedule,
    {
      onSuccess: (_, schedule) => {
        client.invalidateQueries([QUERY_KEYS.GET_ALL_SCHEDULES_BY_TURF]);
        client.invalidateQueries([QUERY_KEYS.GET_ALL_SCHEDULES_BY_USER]);
        toast.success("Cancel Schedule Successfully.");
      },
      onError: () => {
        toast.error("Cancel Schedule failed. Please try again.");
      },
    }
  );
  return {
    cancelSchedule: (
      scheduleData: Partial<ScheduleType> & { reason_cancel: string }
    ) => {
      return mutate(scheduleData);
    },
    isLoading,
    isError,
  };
};

export default useCancelSchedule;
