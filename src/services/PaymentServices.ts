import { axiosClient } from "@/utils/http";

const paymentServices = {
  payForSchedule: (scheduleId: string): Promise<any> => {
    return axiosClient.post(`/payments/${scheduleId}?language=vi`);
  },
};

export default paymentServices;
