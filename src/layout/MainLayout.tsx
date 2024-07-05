import { Box, Link } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

export const MainLayout = ({ children }: { children: React.ReactElement }) => {
  return (
    <Box>
      <Link as={NavLink} to="/">
        Home
      </Link>
      {children}
    </Box>
  );
};
