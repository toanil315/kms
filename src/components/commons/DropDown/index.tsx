import { DropdownProps } from "antd";
import { StyledDropdown } from "./styles";

interface Props extends DropdownProps {}

const DropDown = ({ ...restProps }: Props) => {
  return <StyledDropdown {...restProps} />;
};

export default DropDown;
