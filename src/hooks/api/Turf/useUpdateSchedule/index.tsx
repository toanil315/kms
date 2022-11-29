import { ScheduleType } from "@/data-model";
import { turfServices } from "@/services";
import { QUERY_KEYS } from "@/utils/constants";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

const useUpdateSchedule = () => {
  const client = useQueryClient();
  const { mutate, isLoading, isError } = useMutation(
    turfServices.updateSchedule,
    {
      onSuccess: (_, schedule) => {
        client.invalidateQueries([QUERY_KEYS.GET_ALL_SCHEDULES_BY_TURF]);
        toast.success("Update Schedule Successfully.");
      },
      onError: () => {
        toast.error("Update Schedule failed. Please try again.");
      },
    }
  );
  return {
    updateSchedule: (scheduleData: Partial<ScheduleType>) => {
      return mutate(scheduleData);
    },
    isLoading,
    isError,
  };
};

export default useUpdateSchedule;
