import {
  CustomAxiosResponse,
  LoginResponse,
  UserLogin,
  UserRegister,
  UserType,
} from "@/data-model";
import { axiosClient } from "@/utils/http";

const authServices = {
  login: (
    loginData: UserLogin
  ): Promise<CustomAxiosResponse<LoginResponse>> => {
    return axiosClient.post("/login", loginData);
  },

  register: (registerData: UserRegister): Promise<CustomAxiosResponse<any>> => {
    return axiosClient.post("/user/register", registerData);
  },

  getMe: (): Promise<CustomAxiosResponse<UserType>> => {
    return axiosClient.get("/user");
  },

  logOut: (): Promise<any> => {
    return axiosClient.post("/logout");
  },
};

export default authServices;
