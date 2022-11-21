import { useQuery } from "react-query";
import { turfServices } from "@/services";
import { QUERY_KEYS } from "@/utils/constants";
import { PaginationType, TurfLocation, UseQueryResponse } from "@/data-model";

const useGetCategory = (
  page?: number
): UseQueryResponse<{
  turfLocations?: TurfLocation[];
  meta?: PaginationType;
}> => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    [QUERY_KEYS.GET_ALL_TURF_LOCATIONS, page],
    () => turfServices.getAllLocations(page),
    {
      staleTime: 900000, // 15 min
      cacheTime: 1800000, // 30 min
    }
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

export default useGetCategory;
