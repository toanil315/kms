import styled from "@emotion/styled";
import { Radio } from "antd";
import Box from "../Box";

export const Label = styled(Box)`
  width: 150px;
  display: flex;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;
`;

export const StyledRadioGroup = styled(Radio.Group)`
  .ant-radio-inner::after {
    background-color: ${({ theme }) => theme.colors.primary};
  }
  .ant-radio-checked::after {
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
`;
