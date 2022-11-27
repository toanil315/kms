import { Center, Image, Text } from "@/components";
import { useUser } from "@/hooks/api";
import React from "react";
import NeedToLogin from "@/public/assets/pngs/need-to-login.png";

interface Props {
  element: any;
}

const AuthRoute = ({ element }: Props) => {
  const { user } = useUser();

  if (!user) {
    return (
      <Center flexDirection="column">
        <Image
          width="300px"
          height="300px"
          src={NeedToLogin}
          alt="need to login"
        />
        <Text fontSize="base" fontWeight="medium" color="text">
          You need to login before using app
        </Text>
      </Center>
    );
  }

  return <>{element}</>;
};

export default AuthRoute;
