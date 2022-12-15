import { Box, Button, DropDown, Image, Menu, Text } from "@/components";
import { useModal, useRouter } from "@/hooks";
import { useUser } from "@/hooks/api";
import { LoginModal, RegisterModal } from "@/looks/components";
import React, { useCallback, useMemo } from "react";
import AvatarImage from "@/public/assets/pngs/ava.png";
import { clearTokens } from "@/utils/http/helper";
import { useQueryClient } from "react-query";
import { QUERY_KEYS } from "@/utils/constants";
import { PATHS } from "@/routes/constants";

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
          <DropDown
            overlay={<UserDropdown />}
            trigger={["click"]}
            placement={"bottom"}
            arrow={{ pointAtCenter: true }}
          >
            <Box
              display="flex"
              alignItems="center"
              style={{ cursor: "pointer" }}
            >
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
          </DropDown>
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

const UserDropdown = () => {
  const { navigate } = useRouter();
  const client = useQueryClient();

  const handleLogOut = useCallback(async () => {
    clearTokens();
    client.setQueriesData(QUERY_KEYS.GET_ME, null);
    client.refetchQueries(QUERY_KEYS.GET_ME);
    client.removeQueries({ queryKey: [] });
    navigate(PATHS.HOME);
  }, [client]);

  const userDropdownOptions = useMemo(
    () => [
      {
        id: 2,
        label: (
          <Box onClick={handleLogOut}>
            <Text>Log Out</Text>
          </Box>
        ),
      },
    ],
    [handleLogOut]
  );

  return (
    <Box width="140px">
      <Menu
        items={userDropdownOptions.map((option) => {
          return {
            key: option.id,
            label: option.label,
          };
        })}
      ></Menu>
    </Box>
  );
};

export default Header;
