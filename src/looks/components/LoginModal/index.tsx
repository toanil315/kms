import { Box, Button, Form, Modal, Text } from "@/components";
import { UserLogin } from "@/data-model/AuthTypes";
import { useLoginMutation } from "@/hooks/api";
import { UseModalHelper } from "@/hooks/useModal";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import { loginSchema } from "./constants";

interface Props {
  modal: UseModalHelper;
}

const LoginModal = ({ modal }: Props) => {
  const { login, isLoading } = useLoginMutation();
  const onSubmit: SubmitHandler<UserLogin> = async (data) => {
    await login(data);
    modal.closeModal();
  };

  return (
    <Modal onCancel={modal.closeModal} open={modal.show}>
      <Box width={["400px", "450px", "500px"]}>
        <Box margin="15px 0 30px">
          <Text
            fontSize="xl"
            fontWeight="Bold"
            lineHeight="xl"
            color="text"
            textAlign="center"
          >
            Login
          </Text>
        </Box>
        <Form
          defaultValues={{
            username: "",
            password: "",
          }}
          width="100%"
          onSubmit={onSubmit}
          schema={loginSchema}
          padding="20px 0"
        >
          {({ control }) => {
            return (
              <>
                <Form.Input
                  label="User Name"
                  placeholder="Enter user Name"
                  name="username"
                  control={control}
                />
                <Form.Input
                  label="Password"
                  placeholder="Enter password"
                  name="password"
                  control={control}
                  type="password"
                />
                <Button
                  loading={isLoading}
                  margin="10px 0 0"
                  padding="10px 20px"
                >
                  Login
                </Button>
              </>
            );
          }}
        </Form>
      </Box>
    </Modal>
  );
};

export default LoginModal;
