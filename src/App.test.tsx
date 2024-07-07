import { beforeEach, describe, expect, test, vi } from "vitest";
import App from "./App";
import { render, waitFor } from "@testing-library/react";
import { usePlanetsStore } from "./hooks/usePlanetsStore";

describe("<App/>", () => {
  test("should render succesfully", () => {
    const component = render(<App />);

    expect(component).toMatchSnapshot();
  });

  //TODO: fix

  // test.only("should get all planets", async () => {
  //   usePlanetsStore.setState((state) => ({ ...state, planets: undefined }));
  //   expect(usePlanetsStore.getState().planets).toBe(undefined);

  //   const component = render(<App />);

  //   await waitFor(() => {
  //     console.log(usePlanetsStore.getState().planets);
  //     // expect(usePlanetsStore.getState().planets?.length).toBe(2);
  //     expect(component.getAllByTestId("planet-card")).toBe(2);
  //   });
  // });
});
