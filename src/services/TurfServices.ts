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
    turfId: string,
    startDay: string,
    endDay: string
  ): Promise<CustomAxiosResponseWithPagination<ScheduleType[]>> => {
    return axiosClient.get(
      `/schedules/turfs/${turfId}?page=1&paging=${DEFAULT_PAGE_SIZES.SCHEDULES}&sort=created_at&order=asc&start_day=${startDay}&end_day=${endDay}`
    );
  },

  getScheduleOfUser: (): Promise<
    CustomAxiosResponseWithPagination<ScheduleType[]>
  > => {
    return axiosClient.get(
      `users/schedules?page=1&paging=${DEFAULT_PAGE_SIZES.MAX_SCHEDULES}&sort=created_at&order=asc`
    );
  },

  bookTurf: (
    scheduleData: ScheduleBase
  ): Promise<CustomAxiosResponse<ScheduleType>> => {
    return axiosClient.post("/schedules", scheduleData);
  },

  updateSchedule: ({
    id,
    ...restSchedule
  }: Partial<ScheduleType>): Promise<CustomAxiosResponse<ScheduleType>> => {
    return axiosClient.patch(`/schedules/${id}`, restSchedule);
  },

  cancelSchedule: ({
    id,
    ...restSchedule
  }: Partial<ScheduleType> & { reason_cancel: string }): Promise<
    CustomAxiosResponse<ScheduleType>
  > => {
    return axiosClient.patch(`/schedules/${id}/cancel`, restSchedule);
  },

  getAllSchedulesForReferee: (
    turfId: string,
    startDay: string,
    endDay: string
  ): Promise<CustomAxiosResponseWithPagination<ScheduleType[]>> => {
    return axiosClient.get(
      `/referees/schedules/turfs/${turfId}?page=1&paging=${DEFAULT_PAGE_SIZES.SCHEDULES}&sort=created_at&order=asc&start_day=${startDay}&end_day=${endDay}`
    );
  },

  joinScheduleByReferee: (scheduleId: string): Promise<any> => {
    return axiosClient.patch(`/schedules/${scheduleId}/referee_join`);
  },

  getSchedulesOfReferee: (): Promise<
    CustomAxiosResponseWithPagination<ScheduleType[]>
  > => {
    return axiosClient.get(
      `referees/schedules?page=1&paging=${DEFAULT_PAGE_SIZES.SCHEDULES}&sort=created_at&order=asc`
    );
  },
};

export default turfServices;
