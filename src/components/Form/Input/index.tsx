import Input, { InputProps } from "@/components/commons/Input";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues> = InputProps & UseControllerProps<T>;

const RHFInput = <T extends FieldValues>(props: Props<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  return (
    <Input error={error} {...props} {...field} handleChange={field.onChange} />
  );
};

export default RHFInput;
