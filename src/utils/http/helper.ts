import { localStorageClient } from "../localStorageClient";
import { ACCESS_TOKEN, API_URL, REFRESH_TOKEN } from "../constants";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { LoginResponse } from "@/data-model";

let refreshTokenHandler: Promise<AxiosResponse<any, any>> | undefined =
  undefined;

export const getNewAccessToken = () => {
  const currentRefreshToken = localStorageClient.readValue(
    REFRESH_TOKEN
  ) as string;

  return axios.post(`${API_URL}/refresh_tokens`, {
    refresh_token: currentRefreshToken,
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
  axiosInstance: AxiosInstance
) => {
  originalConfig._retry = true;
  try {
    if (!refreshTokenHandler) {
      refreshTokenHandler = getNewAccessToken();
    }
    const result: AxiosResponse<{ data: LoginResponse }> =
      await refreshTokenHandler;

    const tokens = result
      ? {
          accessToken: result.data.data.access_token,
          refreshToken: result.data.data.refresh_token,
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
