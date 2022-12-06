import { useQuery } from "react-query";
import { turfServices } from "@/services";
import { QUERY_KEYS } from "@/utils/constants";
import { PaginationType, TurfLocation, UseQueryResponse } from "@/data-model";

const useGetAllLocations = (
  page?: number
): UseQueryResponse<{
  turfLocations?: TurfLocation[];
  meta?: PaginationType;
}> => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    [QUERY_KEYS.GET_ALL_TURF_LOCATIONS, page],
    () => turfServices.getAllLocations(page)
  );

  return {
    data: {
      turfLocations: data?.data,
      meta: data?.meta,
    },
    isLoading,
    isError,
    isSuccess,
  };
};

export default useGetAllLocations;
