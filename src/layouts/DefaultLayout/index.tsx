import { Box, Text } from "@/components";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import SideBar from "./components/SideBar";

const DefaultLayout = () => {
  const [containerTitle, setContainerTitle] = useState<string>("Turf List:");

  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <Header />
      <Box display="flex" flexGrow="1">
        <Box width="16%">
          <SideBar />
        </Box>
        <Box width="84%" padding="20px">
          <Text fontSize="lg" fontWeight="bold" lineHeight="xl" color="text">
            {containerTitle}:
          </Text>
          <Box margin="20px 0" height="95%">
            <Outlet context={[containerTitle, setContainerTitle]} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DefaultLayout;
