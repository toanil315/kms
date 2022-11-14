import styled from "@emotion/styled";
import { DatePicker } from "antd";

export const StyledDatePicker = styled(DatePicker)`
  width: 100% !important;
  padding: 14px;
  border-radius: ${({ theme }) => theme.radii.md};
`;
