import { useEffect, useRef, useState } from "react";
import useCustomSearchParams, { PARAMS } from "../useCustomSearchParams";

export interface UsePaginationHelper {
  page: number;
  pageSize: number;
  onChange: (page: number, pageSize: number) => void;
}

interface PaginationInitialParams {
  pageSize: number;
}

const usePagination = (initialParams: PaginationInitialParams) => {
  const {
    transformedSearch: { page, pageSize },
    setSearch,
  } = useCustomSearchParams({
    page: PARAMS.NumberParam,
    pageSize: PARAMS.NumberParam,
  });

  useEffect(() => {
    if (!Boolean(page) || !Boolean(pageSize)) {
      setSearch({
        page: Boolean(page) ? page : "1",
        pageSize: Boolean(pageSize) ? pageSize : String(initialParams.pageSize),
      });
    }
  }, [page]);

  return {
    page: page as number,
    pageSize: pageSize as number,
    onChange: (page: number, pageSize: number) => {
      console.log(page, pageSize);
      setSearch({
        page: String(page),
        pageSize: String(pageSize),
      });
    },
  };
};

export default usePagination;
