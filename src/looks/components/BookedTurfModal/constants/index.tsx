import yupGlobal from "@/utils/yupGlobal";

export const scheduleTurfSchema = yupGlobal.object().shape({
  title: yupGlobal.string().required("Title is required"),
  times: yupGlobal
    .array()
    .of(yupGlobal.string())
    .required("Schedule Time is required"),
  description: yupGlobal.string().required("Notes is required"),
});
