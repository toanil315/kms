import React, { useEffect } from "react";
import {
  Control,
  DeepPartial,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { FormWrapper } from "./styles";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ObjectShape } from "yup/lib/object";
import Box, { BoxProps } from "@/components/commons/Box";

type ChildrenOfRHForm<T> = ({
  control,
}: {
  control: Control<T & FieldValues>;
}) => JSX.Element | JSX.Element[] | undefined;

interface Props<T> extends BoxProps {
  defaultValues?: DeepPartial<T>;
  schema: yup.ObjectSchema<ObjectShape>;
  children: ChildrenOfRHForm<T>;
  onSubmit: SubmitHandler<T & FieldValues>;
  enableResetForm?: boolean;
}

const RHForm = <T extends FieldValues>({
  defaultValues,
  schema,
  onSubmit,
  children,
  enableResetForm,
  ...restProps
}: Props<T>) => {
  const { control, handleSubmit, getValues, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (enableResetForm && defaultValues) {
      reset(defaultValues);
    }
  }, [enableResetForm, defaultValues]);

  return (
    <Box as={FormWrapper} {...restProps} onSubmit={handleSubmit(onSubmit)}>
      {children({ control })}
    </Box>
  );
};

export default RHForm;
