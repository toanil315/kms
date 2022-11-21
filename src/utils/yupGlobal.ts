import * as yupGlobal from "yup";
import { REGEX } from "./constants";

declare module "yup" {
  interface StringSchema {
    isPhone(): StringSchema;
    isPassword(): StringSchema;
  }
}

yupGlobal.addMethod(yupGlobal.string, "isPhone", function isPhone() {
  return this.matches(REGEX.PHONE, {
    message: "Phone number is invalid",
    excludeEmptyString: true,
  });
});

yupGlobal.addMethod(yupGlobal.string, "isPassword", function isPassword() {
  return this.matches(REGEX.PASSWORD, {
    message:
      "Password must be at least 8 character, includes lower, upper case letter, number and special character",
    excludeEmptyString: true,
  });
});

export default yupGlobal;
