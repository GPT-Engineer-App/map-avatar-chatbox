import React from "react";
import { Box } from "@chakra-ui/react";

const MapPlaceholder = () => {
  return (
    <Box width="100%" height="500px" bg="gray.200" display="flex" alignItems="center" justifyContent="center" position="relative">
      {}
      <Box>Map will go here</Box>
    </Box>
  );
};

export default MapPlaceholder;
