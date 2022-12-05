import { ScheduleType } from "@/data-model";
import { turfServices } from "@/services";
import { QUERY_KEYS } from "@/utils/constants";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

const useJoinMatchForReferee = () => {
  const client = useQueryClient();
  const { mutate, isLoading, isError } = useMutation(
    turfServices.joinScheduleByReferee,
    {
      onSuccess: (_) => {
        client.invalidateQueries([QUERY_KEYS.GET_ALL_SCHEDULES_FOR_REFEREE]);
        client.invalidateQueries([QUERY_KEYS.GET_ALL_SCHEDULES_OF_REFEREE]);
        toast.success("Join match successfully.");
      },
      onError: () => {
        toast.error("Join match failed. Please try again.");
      },
    }
  );
  return {
    joinMatch: (scheduleId: string) => {
      return mutate(scheduleId);
    },
    isLoading,
    isError,
  };
};

export default useJoinMatchForReferee;
