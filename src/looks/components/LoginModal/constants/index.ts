import yupGlobal from "@/utils/yupGlobal";

export const loginSchema = yupGlobal.object().shape({
  username: yupGlobal.string().required("User name is required"),
  password: yupGlobal.string().required("Password is required"),
});
