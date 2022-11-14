import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Box } from "@/components";
interface Props {
  isError?: boolean;
  disabled?: boolean;
  direction?: "column" | "row";
  hidden?: boolean;
}

export const Label = styled(Box)`
  width: 150px;
  display: flex;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;
`;

export const Wrapper = styled(Box)<Props>`
  display: flex;
  flex-direction: ${({ direction }) => direction ?? "column"};
  gap: 5px;

  ${({ hidden }) =>
    hidden &&
    css`
      display: none !important;
    `}
`;

export const InputWrapper = styled(Box)<Props>`
  border-width: 1.5px;
  border-style: solid;
  border-color: ${({ isError, theme }) =>
    !isError ? theme.colors.lightGray : `${theme.colors.danger} !important`};
  transition: all 0.2s ease-in;
  overflow: hidden;
  flex-grow: 1;

  display: flex;
  align-items: center;

  padding: 0 5px 0 0;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 1px 8px
      ${({ isError, theme }) =>
        !isError
          ? `${theme.colors.boxShadowPrimary}`
          : `${theme.colors.boxShadowDanger}`};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  ${({ disabled, theme }) =>
    disabled &&
    css`
      background-color: ${theme.colors.lightGray};
      border-color: ${theme.colors.lightGray} !important;
      box-shadow: unset !important;
      cursor: no-drop;

      input {
        color: ${theme.colors.text} !important;
        font-weight: ${theme.fontWeights.medium} !important;
        pointer-events: none;
      }
    `}

  input, textarea {
    width: 100%;
    padding: 14px 16px;
    color: ${({ theme }) => theme.colors.textLight};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    line-height: ${({ theme }) => theme.lineHeights.small};
    background-color: ${({ theme }) => theme.colors.transparent};
    border: 0;
    resize: none;

    &:focus {
      color: ${({ theme }) => theme.colors.text};
      border: 0;
      outline: none;
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.textLight};
    }

    // Remove background color of autocomplete
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      transition: background-color 5000000s ease-in-out 0s;
    }
  }
`;
