import yupGlobal from "@/utils/yupGlobal";

export const scheduleTurfSchema = yupGlobal.object().shape({
  title: yupGlobal.string().required("Title is required"),
  start_time: yupGlobal.string().required("Start date is required"),
  end_time: yupGlobal.string().required("End date is required"),
  description: yupGlobal.string().nullable(),
});
