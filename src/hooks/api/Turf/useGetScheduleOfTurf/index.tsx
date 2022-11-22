import { useQuery } from "react-query";
import { turfServices } from "@/services";
import { QUERY_KEYS } from "@/utils/constants";
import {
  PaginationType,
  ScheduleType,
  TurfLocation,
  UseQueryResponse,
} from "@/data-model";

const useGetScheduleOfTurf = (
  turfId: string
): UseQueryResponse<{
  schedules?: ScheduleType[];
  meta?: PaginationType;
}> => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    [QUERY_KEYS.GET_ALL_SCHEDULES_BY_TURF, turfId],
    () => turfServices.getScheduleOfTurf(turfId),
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
