export enum ERROR_CODE {
  UNAUTHORIZED = 401,
  BAD_REQUEST = 400,
}

export const ACCESS_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";

export const EXPIRE_TIME = {
  ACCESS_TOKEN: 7200,
  REFRESH_TOKEN: 1296000000,
};

export const QUERY_KEYS = {
  GET_ME: "GET_ME",
  GET_ALL_TURF_LOCATIONS: "GET_ALL_TURF_LOCATIONS",
  GET_ALL_TURFS_BY_LOCATION: "GET_ALL_TURFS_BY_LOCATION",
  GET_ALL_SCHEDULES_BY_TURF: "GET_ALL_SCHEDULES_BY_TURF",
};
export const API_URL = import.meta.env.VITE_API_URL;

export const REGEX = {
  PHONE: /^((\+)33|0)[1-9](\d{2}){4}$/,
  PHONE_E164_CONVENTION: /^(\+\d{1,2})\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
  HAS_UPPER_CASE: /[A-Z]/,
  HAS_LOWER_CASE: /[a-z]/,
  HAS_NUMBER: /[0-9]/,
  HAS_SYMBOLS: /["!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"]/,
  PASSWORD: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
};

export const ROLES = {
  USER: "ROLE_USER",
};

export const DEFAULT_PAGE_SIZES = {
  TURF_LOCATION: 16,
  TURFS: 10,
  SCHEDULES: 31,
};

export enum TURF_SIDES {
  SEVEN_SIDE = "Sân 7",
  FIVE_SIDE = "Sân 5",
  ELEVEN_SIDE = "Sân 11",
}
