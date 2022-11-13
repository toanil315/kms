import React from "react";
import { DatePicker } from "antd";
import { Box, Center } from "@/components/commons";

const HomeContainer = () => {
  return (
    <div>
      <Box as={Center} width="500px" height="500px" bg="red">
        <DatePicker />
      </Box>
    </div>
  );
};

export default HomeContainer;
