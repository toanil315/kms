import type { ReactNode } from "react";
import { memo } from "react";
import type { BoxProps } from "../Box";
import * as S from "./styles";

interface ButtonProps extends BoxProps {
  $type?: "primary" | "secondary" | "gray" | "danger";
  as?: string | ReactNode;
  children: ReactNode;
  loading?: boolean;
}

const Button = ({
  $type = "primary",
  as = "button",
  children,
  loading,
  ...rest
}: ButtonProps) => {
  switch ($type) {
    case "primary":
      return (
        <S.PrimaryButton loading={loading} as={as} {...rest}>
          {loading && <S.Loading />}
          {children}
        </S.PrimaryButton>
      );

    case "secondary":
      return (
        <S.SecondaryButton loading={loading} as={as} {...rest}>
          {loading && <S.LoadingSecondary />}
          {children}
        </S.SecondaryButton>
      );

    case "gray":
      return (
        <S.GrayButton as={as} {...rest}>
          {children}
        </S.GrayButton>
      );

    case "danger":
      return (
        <S.DangerButton as={as} {...rest}>
          {children}
        </S.DangerButton>
      );

    default:
      throw new Error("Invalid type button!");
  }
};

export default memo(Button);
