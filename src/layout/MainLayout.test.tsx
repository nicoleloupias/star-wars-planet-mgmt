import { describe, expect, test } from "vitest";
import { render } from "../test-utils";
import { MainLayout } from "./MainLayout";
import { Text } from "@chakra-ui/react";

describe("<MainLayout/>", () => {
  test("should render succesfully", () => {
    const component = render(
      <MainLayout>
        <Text>hello!</Text>
      </MainLayout>
    );

    expect(component).toMatchSnapshot();
  });
});
