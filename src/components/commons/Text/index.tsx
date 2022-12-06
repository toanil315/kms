import styled from "@emotion/styled";
import { space, color, border, typography, compose } from "styled-system";

const StyledText = styled.p(
  { margin: 0 },
  compose(color, border, typography, space)
);
const Text = (props: any) => {
  return <StyledText {...props} />;
};

export default Text;
