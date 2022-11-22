import { useQuery } from "react-query";
import { turfServices } from "@/services";
import { QUERY_KEYS } from "@/utils/constants";
import { PaginationType, TurfType, UseQueryResponse } from "@/data-model";

const useGetTurfsByLocation = (
  locationId: string,
  page?: number
): UseQueryResponse<{
  turfs?: TurfType[];
  meta?: PaginationType;
}> => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    [QUERY_KEYS.GET_ALL_TURFS_BY_LOCATION, locationId, page],
    () => turfServices.getTurfsOfLocation(locationId, page)
  );

  return {
    data: {
      turfs: data?.data,
      meta: data?.meta,
    },
    isLoading,
    isError,
    isSuccess,
  };
};

export default useGetTurfsByLocation;
