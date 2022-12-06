import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import Box, { BoxProps } from "@/components/commons/Box";
import { RadioChangeEvent, RadioGroupProps } from "antd";
import { ErrorMessage, RadioGroup } from "@/components";
import { CustomRadioProps } from "@/components/commons/RadioGroup";
import { useEffect } from "react";

type Props<T extends FieldValues> = CustomRadioProps &
  RadioGroupProps &
  UseControllerProps<T>;

const RHFRadioGroup = <T extends FieldValues>({
  label,
  direction,
  options,
  ...restProps
}: Props<T>) => {
  const {
    field: { value, ...restField },
    fieldState: { error },
  } = useController(restProps);

  const handleChange = (event: RadioChangeEvent) => {
    restField.onChange(event.target.value);
  };

  useEffect(() => {
    if (value) {
      restField.onChange(value);
    }
  }, []);

  return (
    <Box>
      <RadioGroup
        label={label}
        direction={direction}
        options={options}
        value={value}
        onChange={handleChange}
      />
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </Box>
  );
};

export default RHFRadioGroup;
