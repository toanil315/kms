import { Pagination } from "antd";
import styled from "@emotion/styled";

export const StyledPagination = styled(Pagination)`
  display: flex;

  .ant-pagination-item-link,
  .ant-pagination-item {
    border-radius: ${({ theme }) => theme.radii.large};
    vertical-align: middle;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
