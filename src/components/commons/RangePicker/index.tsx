import { RangePickerProps } from "antd/lib/date-picker";
import React from "react";
import Box from "../Box";
import ErrorMessage from "../ErrorMessage";
import Text from "../Text";
import { StyledRangerPicker } from "./styles";

export type CustomRangePickerProps = RangePickerProps & {
  error?: { message?: string };
  label?: string;
};

const RangerPicker = ({
  error,
  label,
  ...restProps
}: CustomRangePickerProps) => {
  return (
    <Box>
      {label && (
        <Box as="div" color="textLight" margin="0 0 5px">
          <Text fontSize="xs" fontWeight="bold" lineHeights="normal">
            {label.toUpperCase()}
          </Text>
        </Box>
      )}
      <StyledRangerPicker {...restProps} />
      {error?.message && <ErrorMessage>{error.message}</ErrorMessage>}
    </Box>
  );
};

export default RangerPicker;
