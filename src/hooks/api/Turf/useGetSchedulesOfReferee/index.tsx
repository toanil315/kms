import { useQuery } from "react-query";
import { turfServices } from "@/services";
import { QUERY_KEYS } from "@/utils/constants";
import { PaginationType, ScheduleType, UseQueryResponse } from "@/data-model";

const useGetScheduleOfReferee = (
  skip: boolean = true
): UseQueryResponse<{
  schedules?: ScheduleType[];
  meta?: PaginationType;
}> => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    [QUERY_KEYS.GET_ALL_SCHEDULES_OF_REFEREE],
    () => turfServices.getSchedulesOfReferee(),
    { enabled: !skip }
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

export default useGetScheduleOfReferee;
