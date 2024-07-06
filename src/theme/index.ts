import { extendTheme } from "@chakra-ui/react";
import { Button } from "./components/Button";

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
    Button
  },
  styles: {
    global: {
      "html,body": {
        bgColor: "gray.900"
      }
    }
  }
});
