import { Box, Button, Image, Text } from "@/components";
import { useModal } from "@/hooks";
import { useUser } from "@/hooks/api";
import { LoginModal, RegisterModal } from "@/looks/components";
import React from "react";
import AvatarImage from "@/public/assets/pngs/ava.png";

const Header = () => {
  const loginModal = useModal();
  const registerModal = useModal();
  const { user } = useUser();

  const handleShowLoginModal = () => {
    loginModal.toggleModal();
  };

  const handleShowRegisterModal = () => {
    registerModal.toggleModal();
  };

  return (
    <Box bg="primary">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="15px 20px"
      >
        <Text
          fontSize="base"
          fontWeight="bold"
          lineHeight="large"
          color="white"
        >
          Turf Management
        </Text>
        {user ? (
          <Box display="flex" alignItems="center" style={{ cursor: "pointer" }}>
            <Image
              width="50px"
              height="50px"
              margin="0 10px 0 0"
              borderRadius="rounded"
              src={AvatarImage}
              alt="avatar"
            />
            <Text
              fontSize="sm"
              fontWeight="medium"
              lineHeight="large"
              color="white"
            >
              Hello {user.full_name}
            </Text>
          </Box>
        ) : (
          <Box display="flex" alignItems="center">
            <Button
              padding="10px 20px"
              fontSize="base"
              fontWeight="bold"
              lineHeight="large"
              color="white"
              $type="secondary"
              onClick={handleShowLoginModal}
            >
              Sign In
            </Button>
            <Button
              margin="0 0 0 15px"
              padding="10px 20px"
              fontSize="base"
              fontWeight="bold"
              lineHeight="large"
              color="white"
              $type="secondary"
              onClick={handleShowRegisterModal}
            >
              Register
            </Button>
          </Box>
        )}
      </Box>
      <LoginModal modal={loginModal} />
      <RegisterModal modal={registerModal} />
    </Box>
  );
};

export default Header;
