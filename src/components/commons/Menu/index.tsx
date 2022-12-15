import { MenuProps } from "antd";
import { StyledMenu } from "./styles";

interface Props extends MenuProps {}

const Menu = ({ ...restProps }: Props) => {
  return <StyledMenu {...restProps} />;
};

export default Menu;
