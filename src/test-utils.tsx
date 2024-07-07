import { ChakraProvider } from "@chakra-ui/react";
import type { RenderOptions, RenderResult } from "@testing-library/react";
import { render } from "@testing-library/react";
import type { MemoryHistory } from "history";
import { createMemoryHistory } from "history";
import React from "react";
import { Router, RouterProvider } from "react-router-dom";
import { theme } from "./theme";
const memoryHistory = createMemoryHistory();

export const AllProviders = ({
  children,
  history = memoryHistory
}: {
  children?: React.ReactNode;
  history?: MemoryHistory;
}) => {
  return (
    <ChakraProvider theme={theme}>
      <Router location={history.location} navigator={history}>
        {children}
      </Router>
    </ChakraProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  {
    options,
    history
  }: {
    options?: RenderOptions;
    history?: MemoryHistory;
  } = {}
): RenderResult =>
  render(ui, {
    wrapper: ({ children }) => <AllProviders history={history}>{children}</AllProviders>,
    ...options
  });

export { customRender as render };
