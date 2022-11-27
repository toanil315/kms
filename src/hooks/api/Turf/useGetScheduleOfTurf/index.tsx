import { useQuery } from "react-query";
import { turfServices } from "@/services";
import { QUERY_KEYS } from "@/utils/constants";
import { PaginationType, ScheduleType, UseQueryResponse } from "@/data-model";

const useGetScheduleOfTurf = (
  turfId: string,
  startDay: string,
  endDay: string
): UseQueryResponse<{
  schedules?: ScheduleType[];
  meta?: PaginationType;
}> => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    [QUERY_KEYS.GET_ALL_SCHEDULES_BY_TURF, turfId, startDay, endDay],
    () => turfServices.getScheduleOfTurf(turfId, startDay, endDay),
    {
      enabled: !!turfId,
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

export default useGetScheduleOfTurf;
