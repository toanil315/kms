import { RangePicker } from "@/components/commons";
import DatePicker, {
  CustomDatePickerProps,
} from "@/components/commons/DatePicker";
import { CustomRangePickerProps } from "@/components/commons/RangePicker";
import { DATE_FORMATS } from "@/utils/helpers/DateTimeUtils";
import moment, { Moment } from "moment";
import { useEffect } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues> = CustomRangePickerProps &
  UseControllerProps<T>;

const RHFRangePicker = <T extends FieldValues>(props: Props<T>) => {
  const {
    field: { value, ...restField },
    fieldState: { error },
  } = useController(props);

  const handleRangePickerChange = (
    value: [Moment | null, Moment | null] | null,
    dateString: [string, string]
  ): void => {
    restField.onChange(dateString);
  };

  useEffect(() => {
    restField.onChange(value);
  }, []);

  return (
    <RangePicker
      error={error}
      {...props}
      {...restField}
      value={value ? [moment(value[0]), moment(value[1])] : null}
      onChange={handleRangePickerChange}
    />
  );
};

export default RHFRangePicker;
