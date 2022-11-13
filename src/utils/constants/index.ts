export enum ERROR_CODE {
  UNAUTHORIZED = 401,
  BAD_REQUEST = 400,
}

export const ACCESS_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";

export const EXPIRE_TIME = {
  ACCESS_TOKEN: 1800000,
  REFRESH_TOKEN: 2592000000,
};

export const QUERY_KEYS = {};
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
