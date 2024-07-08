import { beforeAll, describe, expect, test } from "vitest";
import { Home } from "./Home";
import { render } from "../../test-utils";
import { usePlanetsStore } from "../../hooks/usePlanetsStore";
import { act, fireEvent, waitFor } from "@testing-library/react";
import { planetsMock } from "../../mocks/planet";

describe("<Home/>", () => {
  beforeAll(() => {
    usePlanetsStore.setState(
      {
        planets: planetsMock
      },

      true
    );
  });
  test("should render succesfully", () => {
    const component = render(<Home />);

    expect(component).toMatchSnapshot();
  });

  test("should render a card for each planet", () => {
    const component = render(<Home />);

    expect(component.getAllByTestId("planet-card").length).toBe(10);
  });

  test("should render 'there are no results' if planetsToShow is 0", async () => {
    const component = render(<Home />);

    act(() => {
      fireEvent.change(component.getByTestId("search"), { target: { value: "asdf" } });
      fireEvent.click(component.getByRole("button", { name: "Search" }));
    });

    await waitFor(() => {
      expect(component.getByText("There are no results with this search")).toBeInTheDocument();
    });
  });

  test("should paginate correctly on next button click", async () => {
    const component = render(<Home />);

    await waitFor(() => {
      expect(component.getAllByTestId("planet-card").length).toBe(10);
    });
    await waitFor(() => {
      expect(component.getByRole("button", { name: "Next" })).toBeEnabled();
    });

    act(() => {
      fireEvent.click(component.getByRole("button", { name: "Next" }));
    });

    await waitFor(() => {
      expect(component.getByText(planetsMock[10].name)).toBeInTheDocument();
    });
  });
});
