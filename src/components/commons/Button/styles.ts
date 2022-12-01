import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Box, { BoxProps } from "../Box";

interface Props extends BoxProps {
  loading?: boolean;
}

export const Loading = styled.span`
  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  position: relative;
  width: 20px;
  height: 20px;
  margin-right: 10px;

  &::before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    margin-top: -10px;
    margin-left: -10px;
    border-radius: 50%;
    border: 2.2px solid transparent;
    border-top-color: white;
    animation: spinner 0.7s linear infinite;
  }
`;

export const LoadingSecondary = styled(Loading)`
  &::before {
    border-top-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ButtonBase = styled(Box)<Props>`
  /* css BaseButton */
  border-width: 1.6px;
  border-style: solid;
  border-radius: ${({ theme }) => theme.radii.large};
  outline: "none";

  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  letter-spacing: 0.04em;
  text-transform: uppercase;

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ loading }) =>
    loading &&
    css`
      pointer-events: none; // user cant click when button is loading
      filter: brightness(110%);
    `}

  cursor: pointer;
  transition: all 0.15s ease-out;

  &:hover {
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    cursor: not-allowed;
    box-shadow: unset;
  }
`;

// tat ca button deu duoc ke thua thuoc tinh cua button base
export const PrimaryButton = styled(ButtonBase)`
  /* css primary button */
  /* example use theme global variables */
  background: ${({ theme }) => theme.colors.primary};
  border-color: ${({ theme }) => theme.colors.primary};
  color: white;

  &:hover {
    filter: brightness(105%);
  }

  &:active {
    filter: brightness(90%);
  }
`;

export const SecondaryButton = styled(ButtonBase)`
  /* css secondary button */
  background: white;
  border-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};

  &:hover {
    filter: brightness(105%);
  }

  &:active {
    filter: brightness(90%);
  }
`;

export const GrayButton = styled(ButtonBase)`
  /* css gray button */
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-color: transparent;
`;

export const DangerButton = styled(ButtonBase)`
  /* css danger button */
  background-color: transparent;
  border-color: ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.danger};
`;
