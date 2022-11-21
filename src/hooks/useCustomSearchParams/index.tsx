import { serializeFormQuery } from "@/utils/helpers";
import { useSearchParams } from "react-router-dom";

export const PARAMS: {
  [k: string]: (value: string) => string | number | boolean;
} = {
  BooleanParam: (value = "") => value === "true",
  NumberParam: (value = "") => (value ? Number(value) : 0),
  StringParams: (value = "") => value,
};

const useCustomSearchParams = (
  param: { [k: string]: (value: string) => string | number | boolean } = {}
) => {
  const [search, setSearchParams] = useSearchParams();
  const transformedSearch: { [k: string]: string | number | boolean } =
    serializeFormQuery(search, param);

  return {
    transformedSearch,
    setSearch: (params: { [k: string]: string | number | boolean }) => {
      for (let key in params) {
        search.set(key, params[key] as string);
      }
      setSearchParams(search, { replace: true });
    },
  };
};

export default useCustomSearchParams;
