import { describe, expect, test } from "vitest";
import App from "./App";
import { render } from "@testing-library/react";

describe("<App/>", () => {
  test("should render succesfully", () => {
    const component = render(<App />);

    expect(component).toMatchSnapshot();
  });

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
