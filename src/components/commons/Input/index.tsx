import React, {
  ChangeEvent,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { ErrorMessage, Box, Text } from "@/components/commons";
import * as S from "./styles";
import { BoxProps } from "../Box";

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
  BoxProps & {
    width?: string;
    suffixIcon?: JSX.Element;
    suffixPosition?: "left" | "right";
    label?: string;
    isRequired?: boolean;
    error?: { message?: string };
    handleChange?: (value: string | number | undefined) => void;
    direction?: "column" | "row";
    as?: "input" | "textarea";
    type?: "text" | "number";
  };

const Input: React.FC<InputProps> = React.forwardRef(
  (
    {
      width = "100%",
      suffixIcon,
      suffixPosition = "left",
      label,
      isRequired = false,
      disabled = false,
      error,
      handleChange,
      value,
      direction,
      as = "input",
      hidden,
      bg = "transparent",
      type = "text",
      ...restProps
    },
    ref
  ) => {
    const { name } = restProps;
    const [inputValue, setInputValue] = useState<string | number | undefined>(
      value
    );

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(
        type === "number" ? Number(e.target.value) : e.target.value
      );
    };

    useEffect(() => {
      if (!value || value !== inputValue) {
        setInputValue(value);
      }
    }, [value]);

    useEffect(() => {
      handleChange && handleChange(inputValue);
    }, [inputValue]);

    return (
      <S.Wrapper hidden={hidden} direction={direction} width={width}>
        <S.Label as="label" htmlFor={name}>
          <Box as="span" color="textLight">
            <Text fontSize="xs" fontWeight="bold" lineHeights="normal">
              {label}
            </Text>
          </Box>
          {isRequired && (
            <Box as="span" color="danger">
              {" "}
              *
            </Box>
          )}
        </S.Label>
        <Box flexGrow="1">
          <S.InputWrapper
            bg={bg}
            borderRadius="md"
            disabled={disabled}
            isError={!!error}
          >
            <Box order={suffixPosition === "left" ? "1" : "2"}>
              {suffixIcon}
            </Box>
            <Box
              order={suffixPosition === "left" ? "2" : "1"}
              rows={5}
              as={as}
              value={inputValue}
              {...restProps}
              id={name}
              type={type}
              onChange={handleInputChange}
            />
          </S.InputWrapper>
          {error && <ErrorMessage>{error.message}</ErrorMessage>}
        </Box>
      </S.Wrapper>
    );
  }
);

export default Input;
