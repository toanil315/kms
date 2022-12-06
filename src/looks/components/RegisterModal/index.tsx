import { Box, Button, Center, Form, Modal, Text } from "@/components";
import { UserRegister } from "@/data-model";
import { useRegisterMutation } from "@/hooks/api";
import { UseModalHelper } from "@/hooks/useModal";
import { USER_ROLES } from "@/utils/constants";
import { Col, Row } from "antd";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import { registerSchema } from "./constants";

interface Props {
  modal: UseModalHelper;
}

const RegisterModal = ({ modal }: Props) => {
  const { register, isLoading } = useRegisterMutation();
  const onSubmit: SubmitHandler<UserRegister> = async (data) => {
    await register(data);
    modal.closeModal();
  };

  return (
    <Modal onCancel={modal.closeModal} open={modal.show}>
      <Box width={["400px", "450px", "700px"]}>
        <Box margin="15px 0">
          <Text
            fontSize="xl"
            fontWeight="Bold"
            lineHeight="xl"
            color="text"
            textAlign="center"
          >
            Register
          </Text>
        </Box>
        <Form
          defaultValues={{
            username: "",
            password: "",
            full_name: "",
            password_confirmation: "",
            phone_number: "",
            role: USER_ROLES.USER,
          }}
          width="100%"
          onSubmit={onSubmit}
          schema={registerSchema}
          padding="20px 0"
        >
          {({ control }) => {
            return (
              <Box as={Row} width="100%" gutter={[20, 20]}>
                <Col span={12}>
                  <Form.Radio
                    options={Object.keys(USER_ROLES).map((key) => ({
                      value: USER_ROLES[key as keyof typeof USER_ROLES],
                      label: key.toLocaleUpperCase(),
                    }))}
                    label="User type"
                    name="role"
                    control={control}
                  />
                </Col>
                <Col span={12}>
                  <Form.Input
                    label="Full Name"
                    placeholder="Enter user Name"
                    name="full_name"
                    control={control}
                  />
                </Col>
                <Col span={12}>
                  <Form.Input
                    label="User Name"
                    placeholder="Enter user Name"
                    name="username"
                    control={control}
                  />
                </Col>
                <Col span={12}>
                  <Form.Input
                    label="Phone Number"
                    placeholder="Enter phone number"
                    name="phone_number"
                    control={control}
                  />
                </Col>
                <Col span={12}>
                  <Form.Input
                    label="Password"
                    placeholder="Enter password"
                    name="password"
                    control={control}
                    type="password"
                  />
                </Col>
                <Col span={12}>
                  <Form.Input
                    label="Password Confirmation"
                    placeholder="Enter password again"
                    name="password_confirmation"
                    control={control}
                    type="password"
                  />
                </Col>
                <Col span={24}>
                  <Center>
                    <Button
                      width="50%"
                      loading={isLoading}
                      margin="10px 0 0"
                      padding="10px 20px"
                    >
                      Register
                    </Button>
                  </Center>
                </Col>
              </Box>
            );
          }}
        </Form>
      </Box>
    </Modal>
  );
};

export default RegisterModal;
