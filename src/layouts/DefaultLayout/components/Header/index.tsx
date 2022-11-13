import { Box, Text } from "@/components";
import React from "react";

const Header = () => {
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
        <Box>
          <Text
            fontSize="base"
            fontWeight="bold"
            lineHeight="large"
            color="white"
          >
            Sign In
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
