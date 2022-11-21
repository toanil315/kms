/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { keyframes } from "@emotion/css";
import styled from "@emotion/styled";

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 100;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 70, 100;
    stroke-dashoffset: -30;
  }
  100% {
    stroke-dasharray: 70, 100;
    stroke-dashoffset: -90;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  min-height: 80px;
  svg {
    animation: ${rotate} 2s linear infinite;
    circle {
      stroke: ${({ theme }) => theme.colors.primary};
      stroke-width: 3px;
      stroke-linecap: round;
      animation: ${dash} 1.6s ease-in-out infinite;
    }
  }
`;

const PlaceHolderSpinner = (
  props: any,
  ref:
    | ((instance: HTMLDivElement | null) => void)
    | React.RefObject<HTMLDivElement>
    | null
    | undefined
) => (
  <Wrapper ref={ref} {...props}>
    <svg width="40" height="40" viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="15" fill="none" />
    </svg>
  </Wrapper>
);

export default React.forwardRef(PlaceHolderSpinner);
