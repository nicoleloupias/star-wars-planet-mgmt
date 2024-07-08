import { Box, Flex, Link } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

export const MainLayout = ({ children }: { children: React.ReactElement }) => {
  return (
    <Box>
      <Flex as="nav" zIndex={1} p={4} gap={6} pos="fixed">
        <Link as={NavLink} to="/">
          Home
        </Link>
        <Link as={NavLink} to="/create">
          Create
        </Link>
      </Flex>

      {children}
    </Box>
  );
};
