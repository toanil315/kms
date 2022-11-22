import {
  CustomAxiosResponseWithPagination,
  TurfLocation,
  TurfType,
} from "@/data-model";
import { DEFAULT_PAGE_SIZES } from "@/utils/constants";
import { axiosClient } from "@/utils/http";

const turfServices = {
  getAllLocations: (
    page?: number
  ): Promise<CustomAxiosResponseWithPagination<TurfLocation[]>> => {
    return axiosClient.get(
      `/location_turfs?page=${page ?? 1}&paging=${
        DEFAULT_PAGE_SIZES.TURF_LOCATION
      }&sort=created_at&order=asc`
    );
  },
  getTurfsOfLocation: (
    locationId: string,
    page?: number
  ): Promise<CustomAxiosResponseWithPagination<TurfType[]>> => {
    return axiosClient.get(
      `/turfs/location_turfs/${locationId}?page=${page ?? 1}&paging=${
        DEFAULT_PAGE_SIZES.TURFS
      }&sort=created_at&order=asc`
    );
  },
};

export default turfServices;
