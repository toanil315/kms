import { UsePaginationHelper } from "@/hooks/usePagination";
import { PaginationProps } from "antd";
import React from "react";
import { StyledPagination } from "./styles";

interface Props extends PaginationProps {
  pagination: UsePaginationHelper;
}

const Pagination = ({ pagination, ...restProps }: Props) => {
  return <StyledPagination onChange={pagination.onChange} {...restProps} />;
};

export default Pagination;
