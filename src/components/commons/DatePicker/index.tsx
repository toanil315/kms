import { DatePickerProps } from "antd";
import React from "react";
import Box from "../Box";
import ErrorMessage from "../ErrorMessage";
import Text from "../Text";
import { StyledDatePicker } from "./styles";

export type CustomDatePickerProps = DatePickerProps & {
  error?: { message?: string };
  label?: string;
};

const DatePicker = ({ label, error, ...restProps }: CustomDatePickerProps) => {
  return (
    <Box>
      {label && (
        <Box as="div" color="textLight" margin="0 0 5px">
          <Text fontSize="xs" fontWeight="bold" lineHeights="normal">
            {label.toUpperCase()}
          </Text>
        </Box>
      )}
      <StyledDatePicker format={"YYYY-MM-DD HH:mm"} {...restProps} />
      {error?.message && <ErrorMessage>{error.message}</ErrorMessage>}
    </Box>
  );
};

export default DatePicker;
