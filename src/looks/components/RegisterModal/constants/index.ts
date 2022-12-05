import yupGlobal from "@/utils/yupGlobal";

export const registerSchema = yupGlobal.object().shape({
  role: yupGlobal.string().nullable(),
  full_name: yupGlobal.string().required("Full Name is required"),
  username: yupGlobal.string().required("User name is required"),
  phone_number: yupGlobal
    .string()
    .required("Phone number is required")
    .isPhone(),
  password: yupGlobal.string().required("Password is required").isPassword(),
  password_confirmation: yupGlobal
    .string()
    .required("Password confirmation is required")
    .oneOf(
      [yupGlobal.ref("password"), null],
      "Password confirmation must be matched with password"
    ),
});
