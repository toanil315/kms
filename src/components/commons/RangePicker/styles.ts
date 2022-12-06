import styled from "@emotion/styled";
import { DatePicker } from "antd";

export const StyledRangerPicker = styled<any>(DatePicker.RangePicker)`
  width: 100% !important;
  padding: 14px;
  border-radius: ${({ theme }) => theme.radii.md};
`;
