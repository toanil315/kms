import axios from "axios";
import { ACCESS_TOKEN, BASE_URL } from "../constants";
import { localStorageClient } from "../localStorageClient";
import { handleRefreshToken } from "./helper";

export const axiosClient = axios.create({
  baseURL: `${BASE_URL}`,
});

axiosClient.interceptors.request.use(
  async function (config) {
    // add access token to header before request is sent
    const accessToken = localStorageClient.readValue(ACCESS_TOKEN);
    config.headers = config.headers ?? {};
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken as string}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function ({ data }) {
    return data;
  },
  async function (error) {
    const originalConfig = error.config;
    if (error.response) {
      if (
        error.response?.data?.error?.message === "Token invalid" &&
        !originalConfig._retry
      ) {
        await handleRefreshToken(originalConfig, axiosClient, "client");
      }
    }
    return Promise.reject(error);
  }
);
