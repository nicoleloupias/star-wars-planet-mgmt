import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const secondary = defineStyle({
  border: "1px solid",
  borderColor: "red.500",
  borderRadius: 20,
  fontWeight: "semibold",
  boxShadow: "0px 0px 10px 0px rgba(255,18,73,0.6)",
  _hover: {
    bgColor: "red.500"
  }
});

const primary = defineStyle({
  bgColor: "red.500",
  borderRadius: 20,
  fontWeight: "semibold",
  boxShadow: "0px 0px 10px 0px rgba(255,18,73,0.6)",
  _hover: {
    boxShadow: "0px 0px 20px 0px rgba(255,18,73,0.7)",
    _disabled: {
      background: "red.500"
    }
  }
});

export const Button = defineStyleConfig({
  baseStyle: {},
  sizes: {
    md: {
      minW: "110px"
    }
  },
  variants: { primary, secondary }
});
