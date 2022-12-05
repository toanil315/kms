import { CheckboxGroupProps } from "antd/lib/checkbox";
import React from "react";
import Box from "../Box";
import Text from "../Text";
import { Label, StyledCheckBoxGroup } from "./styles";

export interface CustomCheckBoxProps extends CheckboxGroupProps {
  label?: string;
  direction?: "row" | "column";
}

const CheckBoxGroup = ({
  label,
  direction = "column",
  ...restProps
}: CustomCheckBoxProps) => {
  return (
    <Box
      display="flex"
      alignItems="baseline"
      flexDirection={direction}
      style={{ gap: 5 }}
    >
      {label && (
        <Label>
          <Box as="span" color="textLight">
            <Text fontSize="xs" fontWeight="bold" lineHeights="normal">
              {label}
            </Text>
          </Box>
        </Label>
      )}
      <StyledCheckBoxGroup {...restProps} />
    </Box>
  );
};

export default CheckBoxGroup;
