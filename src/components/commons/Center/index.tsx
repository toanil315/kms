import React from "react";
import Box from "../Box";

const Center = (props: any) => {
  return (
    <Box
      {...props}
      display="flex"
      justifyContent="center"
      alignItems="center"
    />
  );
};

export default Center;
