import * as yup from "yup";

export const scheduleTurfSchema = yup.object().shape({
  title: yup.string().required("Orderer Name is required"),
  start: yup.string().required("Start date is required"),
  end: yup.string().required("End date is required"),
  desc: yup.string().nullable(),
});
