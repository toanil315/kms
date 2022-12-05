import styled from "@emotion/styled";
import { Checkbox, Radio } from "antd";
import Box from "../Box";

export const Label = styled(Box)`
  width: 150px;
  display: flex;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;
`;

export const StyledCheckBoxGroup = styled(Checkbox.Group)`
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${({ theme }) => theme.colors.primary} !important;
    border-color: ${({ theme }) => theme.colors.primary} !important;
  }
`;
