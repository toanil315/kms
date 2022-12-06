import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import Box, { BoxProps } from "@/components/commons/Box";
import { CheckBoxGroup, ErrorMessage } from "@/components/commons";
import { CustomCheckBoxProps } from "@/components/commons/CheckBox";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { useEffect } from "react";

type Props<T extends FieldValues> = CustomCheckBoxProps &
  UseControllerProps<T> &
  BoxProps;

const RHFCheckBoxGroup = <T extends FieldValues>({
  label,
  direction,
  options,
  ...restProps
}: Props<T>) => {
  const {
    field: { value, ...restField },
    fieldState: { error },
  } = useController(restProps);

  const handleChange = (checkedValue: CheckboxValueType[]) => {
    restField.onChange(checkedValue);
  };

  useEffect(() => {
    if (value) {
      restField.onChange(value);
    }
  }, []);

  return (
    <Box>
      <CheckBoxGroup
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

export default RHFCheckBoxGroup;
