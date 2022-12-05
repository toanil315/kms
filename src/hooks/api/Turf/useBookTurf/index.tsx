import { useMutation, useQuery, useQueryClient } from "react-query";
import { turfServices } from "@/services";
import { QUERY_KEYS } from "@/utils/constants";
import { ScheduleBase, ScheduleType } from "@/data-model";
import { toast } from "react-toastify";

const useBookTurf = (): {
  bookTurf: (scheduleData: ScheduleBase) => void;
  data?: ScheduleType;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
} => {
  const client = useQueryClient();
  const { mutate, data, isLoading, isError, isSuccess } = useMutation(
    turfServices.bookTurf,
    {
      onSuccess: (_, schedule) => {
        client.invalidateQueries([
          QUERY_KEYS.GET_ALL_SCHEDULES_BY_TURF,
          schedule.turf_id,
        ]);
        client.invalidateQueries([QUERY_KEYS.GET_ALL_SCHEDULES_BY_USER]);
        toast.success("Book Turf Successfully.");
      },
      onError: () => {
        toast.error("Book Turf failed. Please try again.");
      },
    }
  );

  return {
    bookTurf: (scheduleData: ScheduleBase) => {
      return mutate(scheduleData);
    },
    data: data?.data,
    isLoading,
    isError,
    isSuccess,
  };
};

export default useBookTurf;
