import { beforeEach, describe, expect, test } from "vitest";
import App from "./App";
import { render, waitFor } from "@testing-library/react";
import { usePlanetsStore } from "./hooks/usePlanetsStore";

describe("<App/>", () => {
  beforeEach(() => {
    usePlanetsStore.setState(
      (state) => ({
        ...state,
        planets: undefined
      }),
      true
    );
  });

  test("should render succesfully", () => {
    const component = render(<App />);

    expect(component).toMatchSnapshot();
  });

  test("should get all planets", async () => {
    usePlanetsStore.setState((state) => ({ ...state, planets: undefined }));
    expect(usePlanetsStore.getState().planets).toBe(undefined);

    const component = render(<App />);

    await waitFor(() => {
      expect(component.getAllByTestId("planet-card").length).toBe(10);
    });
  });
});
