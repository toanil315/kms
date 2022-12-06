import styled from "@emotion/styled";
import {
  space,
  color,
  layout,
  flexbox,
  border,
  background,
  position,
  grid,
  shadow,
  compose,
} from "styled-system";

const StyledBox = styled.div(
  compose(
    space,
    color,
    layout,
    flexbox,
    border,
    background,
    position,
    grid,
    shadow
  )
);

export type BoxProps = any;

const Box = (props: BoxProps) => {
  return <StyledBox {...props} />;
};

export default Box;
