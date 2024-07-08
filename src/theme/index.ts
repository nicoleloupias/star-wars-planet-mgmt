import { extendTheme } from "@chakra-ui/react";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import "@fontsource-variable/outfit";
import { Select } from "./components/Select";

export const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false
  },
  colors: {
    red: {
      500: "#FF1249"
    }
  },
  components: {
    Button,
    Input,
    Select
  },
  fonts: {
    body: "'Outfit Variable', sans-serif",
    heading: "'Outfit Variable', sans-serif"
  },
  styles: {
    global: {
      "html,body": {
        bgColor: "gray.900"
      }
    }
  }
});
