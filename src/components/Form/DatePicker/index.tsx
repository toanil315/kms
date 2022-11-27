import DatePicker, {
  CustomDatePickerProps,
} from "@/components/commons/DatePicker";
import moment, { Moment } from "moment";
import { useEffect } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues> = CustomDatePickerProps &
  UseControllerProps<T>;

const RHFDatePicker = <T extends FieldValues>(props: Props<T>) => {
  const {
    field: { value, ...restField },
    fieldState: { error },
  } = useController(props);

  const handleDatePickerChange = (value: Moment | null, dateString: string) => {
    restField.onChange(dateString);
  };

  useEffect(() => {
    restField.onChange(value);
  }, []);

  return (
    <DatePicker
      error={error}
      {...props}
      {...restField}
      value={value !== "" ? moment(value) : moment(new Date())}
      onChange={handleDatePickerChange}
    />
  );
};

export default RHFDatePicker;
