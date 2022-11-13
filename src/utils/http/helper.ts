import { localStorageClient } from "../localStorageClient";
import { ACCESS_TOKEN, EXPIRE_TIME, REFRESH_TOKEN } from "../constants";
import axios, { AxiosInstance, AxiosResponse } from "axios";

let refreshTokenHandler: Promise<AxiosResponse<any, any>> | undefined =
  undefined;

export const getNewAccessToken = () => {
  const currentRefreshToken = localStorageClient.readValue(
    REFRESH_TOKEN
  ) as string;

  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/refresh-token`, {
    refreshToken: currentRefreshToken,
  });
};

export const setAccessToken = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  localStorageClient.setValue(ACCESS_TOKEN, accessToken);
  localStorageClient.setValue(REFRESH_TOKEN, refreshToken);
};

export const clearTokens = () => {
  localStorageClient.removeValue(ACCESS_TOKEN);
  localStorageClient.removeValue(REFRESH_TOKEN);
};

export const handleRefreshToken = async (
  originalConfig: any,
  axiosInstance: AxiosInstance,
  mode: "server" | "client"
) => {
  originalConfig._retry = true;
  try {
    if (!refreshTokenHandler) {
      refreshTokenHandler = getNewAccessToken();
    }
    const result = await refreshTokenHandler;

    const tokens = result
      ? {
          accessToken: result.data.data.token,
          refreshToken: result.data.data.refreshToken,
        }
      : undefined;
    if (tokens) {
      setAccessToken(tokens);
      return axiosInstance(originalConfig);
    }
  } catch (error) {
    clearTokens();
  } finally {
    refreshTokenHandler = undefined;
  }
};
