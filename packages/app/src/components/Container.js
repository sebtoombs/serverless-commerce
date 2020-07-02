import React from "react";
import { Box } from "@chakra-ui/core";

const Container = ({ children, fluid, ...props }) => {
  return (
    <Box maxW={fluid ? "" : "6xl"} px="8" {...props}>
      {children}
    </Box>
  );
};

export default Container;
