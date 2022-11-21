import { CustomAxiosResponseWithPagination, TurfLocation } from "@/data-model";
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
};

export default turfServices;
