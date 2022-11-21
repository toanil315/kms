import { Box, Button, Form, Modal, Text } from "@/components";
import { UserRegister } from "@/data-model";
import { useRegisterMutation } from "@/hooks/api";
import { UseModalHelper } from "@/hooks/useModal";
import { ROLES } from "@/utils/constants";
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
      <Box width={["400px", "450px", "500px"]}>
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
            role: ROLES.USER,
          }}
          width="100%"
          onSubmit={onSubmit}
          schema={registerSchema}
          padding="20px 0"
        >
          {({ control }) => {
            return (
              <>
                <Form.Input
                  label="Full Name"
                  placeholder="Enter user Name"
                  name="full_name"
                  control={control}
                />
                <Form.Input
                  label="User Name"
                  placeholder="Enter user Name"
                  name="username"
                  control={control}
                />
                <Form.Input
                  label="Phone Number"
                  placeholder="Enter phone number"
                  name="phone_number"
                  control={control}
                />
                <Form.Input
                  label="Password"
                  placeholder="Enter password"
                  name="password"
                  control={control}
                  type="password"
                />
                <Form.Input
                  label="Password Confirmation"
                  placeholder="Enter password again"
                  name="password_confirmation"
                  control={control}
                  type="password"
                />
                <Button
                  loading={isLoading}
                  margin="10px 0 0"
                  padding="10px 20px"
                >
                  Register
                </Button>
              </>
            );
          }}
        </Form>
      </Box>
    </Modal>
  );
};

export default RegisterModal;
