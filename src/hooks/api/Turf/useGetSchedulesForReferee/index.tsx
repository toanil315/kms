import { useQuery } from "react-query";
import { turfServices } from "@/services";
import { QUERY_KEYS } from "@/utils/constants";
import { PaginationType, ScheduleType, UseQueryResponse } from "@/data-model";

const useGetScheduleForReferee = (
  turfId: string,
  startDay: string,
  endDay: string,
  skip: boolean = true
): UseQueryResponse<{
  schedules?: ScheduleType[];
  meta?: PaginationType;
}> => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    [QUERY_KEYS.GET_ALL_SCHEDULES_FOR_REFEREE, turfId, startDay, endDay],
    () => turfServices.getAllSchedulesForReferee(turfId, startDay, endDay),
    {
      enabled: Boolean(turfId) && !skip,
    }
  );

  return {
    data: {
      schedules: data?.data,
      meta: data?.meta,
    },
    isLoading,
    isError,
    isSuccess,
  };
};

export default useGetScheduleForReferee;
