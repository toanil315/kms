import { ModalProps } from "antd";
import React from "react";
import { StyledModal } from "./styles";
import CloseIcon from "@/public/assets/svgs/CloseIcon";

interface Props extends ModalProps {}

const CustomModal = ({ ...restProps }: Props) => {
  return (
    <StyledModal
      maskTransitionName=""
      closeIcon={<CloseIcon />}
      footer={null}
      {...restProps}
    />
  );
};

export default CustomModal;
