import yupGlobal from "@/utils/yupGlobal";

export const scheduleTurfSchema = yupGlobal.object().shape({
  title: yupGlobal.string().required("Orderer Name is required"),
  start: yupGlobal.string().required("Start date is required"),
  end: yupGlobal.string().required("End date is required"),
  desc: yupGlobal.string().nullable(),
});
