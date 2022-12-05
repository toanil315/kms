import { RadioGroupProps } from "antd";
import Box from "../Box";
import Text from "../Text";
import { Label, StyledRadioGroup } from "./styles";

export interface CustomRadioProps extends RadioGroupProps {
  label?: string;
  direction?: "row" | "column";
}

const RadioGroup = ({
  label,
  direction = "column",
  ...restProps
}: CustomRadioProps) => {
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
      <StyledRadioGroup {...restProps} />
    </Box>
  );
};

export default RadioGroup;
