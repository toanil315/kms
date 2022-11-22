import {
  CustomAxiosResponse,
  CustomAxiosResponseWithPagination,
  ScheduleBase,
  ScheduleType,
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

  getScheduleOfTurf: (
    turfId: string
  ): Promise<CustomAxiosResponseWithPagination<ScheduleType[]>> => {
    return axiosClient.get(
      `/schedules/turfs/${turfId}?page=1&paging=${DEFAULT_PAGE_SIZES.SCHEDULES}&sort=created_at&order=asc`
    );
  },

  bookTurf: (
    scheduleData: ScheduleBase
  ): Promise<CustomAxiosResponse<ScheduleType>> => {
    return axiosClient.post("/schedules", scheduleData);
  },
};

export default turfServices;
