import { beforeAll, beforeEach, describe, expect, test } from "vitest";
import { render } from "../../../test-utils";
import { act, fireEvent, waitFor } from "@testing-library/react";
import { EditPlanet } from "./EditPlanet";
import { usePlanetsStore } from "../../../hooks/usePlanetsStore";
import type { MemoryHistory } from "history";
import { createMemoryHistory } from "history";
import { Route, Routes } from "react-router-dom";

describe("<EditPlanet/>", () => {
  const planetData = {
    id: "11",
    name: "Geonosis",
    rotation_period: "30",
    orbital_period: "256",
    diameter: "11370",
    climate: "temperate, arid",
    gravity: "0.9 standard",
    terrain: "rock, desert, mountain, barren",
    surface_water: "5",
    population: "100000000000",
    residents: ["https://swapi.dev/api/people/63/"],
    films: ["https://swapi.dev/api/films/5/"],
    created: "2014-12-10T12:47:22.350000Z",
    edited: "2014-12-20T20:58:18.437000Z",
    url: "https://swapi.dev/api/planets/11/"
  };
  beforeAll(() => {
    usePlanetsStore.setState(
      (state) => ({
        ...state,
        planets: [planetData]
      }),
      true
    );
  });

  let history: MemoryHistory;

  beforeEach(() => {
    history = createMemoryHistory({
      initialEntries: ["/11/edit"]
    });
  });
  const factoryComponent = () => {
    return render(
      <Routes>
        <Route path="/:id/edit" element={<EditPlanet />} />
      </Routes>,
      { history }
    );
  };

  test("should render succesfully", () => {
    const component = factoryComponent();

    expect(component).toMatchSnapshot();
  });

  test("should fill form with current values", async () => {
    const component = factoryComponent();
    await waitFor(() => {
      expect(component.getByRole("textbox", { name: "Climate" })).toHaveValue(planetData.climate);
      expect(component.getByRole("textbox", { name: "Name" })).toHaveValue(planetData.name);
      //...
    });
  });

  test("should edit planet correctly", async () => {
    const component = factoryComponent();

    act(() => {
      fireEvent.change(component.getByRole("textbox", { name: "Climate" }), { target: { value: "Hotter!" } });
    });

    await waitFor(() => {
      expect(component.getByRole("button", { name: /Edit/ })).toBeEnabled();
    });

    expect(history.location.pathname).toBe("/11/edit");
    expect(usePlanetsStore.getState().planets?.[0].climate).toBe(planetData.climate);

    fireEvent.click(component.getByRole("button", { name: /Edit/ }));

    await waitFor(() => {
      expect(usePlanetsStore.getState().planets?.length).toBe(1);
      expect(usePlanetsStore.getState().planets?.[0].climate).toBe("Hotter!");
      expect(history.location.pathname).toBe("/11");
      expect(component.getByText(`Success! Planet ${planetData.name} was updated in our system.`)).toBeInTheDocument();
    });
  });

  test("should edit diameter & population with unknown if its empty", async () => {
    const component = factoryComponent();

    act(() => {
      fireEvent.change(component.getByRole("spinbutton", { name: "Diameter (km)" }), { target: { value: "" } });
      fireEvent.change(component.getByRole("spinbutton", { name: "Population" }), { target: { value: "" } });
    });

    await waitFor(() => {
      expect(component.getByRole("button", { name: /Edit/ })).toBeEnabled();
    });

    fireEvent.click(component.getByRole("button", { name: /Edit/ }));

    await waitFor(() => {
      expect(usePlanetsStore.getState().planets?.[0].diameter).toBe("unknown");
      expect(usePlanetsStore.getState().planets?.[0].population).toBe("unknown");
    });
  });
});
