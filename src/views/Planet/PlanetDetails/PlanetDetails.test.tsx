import { beforeEach, describe, expect, test } from "vitest";
import { render } from "../../../test-utils";
import { fireEvent, waitFor } from "@testing-library/react";
import { PlanetDetails } from "./PlanetDetails";
import { usePlanetsStore } from "../../../hooks/usePlanetsStore";
import type { MemoryHistory } from "history";
import { createMemoryHistory } from "history";
import { Route, Routes } from "react-router-dom";
import { useResidentsStore } from "../../../hooks/useResidentsStore";

describe("<PlanetDetails />", () => {
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

  let history: MemoryHistory;
  beforeEach(() => {
    history = createMemoryHistory({
      initialEntries: ["/11"]
    });

    usePlanetsStore.setState(
      (state) => ({
        ...state,
        planets: [planetData]
      }),
      true
    );
    useResidentsStore.setState((state) => ({ ...state, residents: {} }), true);
  });

  const factoryComponent = () =>
    render(
      <Routes>
        <Route path="/:id" element={<PlanetDetails />} />
      </Routes>,
      { history }
    );

  test("should render succesfully", () => {
    const component = factoryComponent();

    expect(component).toMatchSnapshot();
  });

  test("should render basic planet data", () => {
    const component = factoryComponent();

    expect(component.getByText(planetData.name, { exact: false })).toBeInTheDocument();
    expect(component.getByText(planetData.diameter, { exact: false })).toBeInTheDocument();
    expect(component.getByText(planetData.population, { exact: false })).toBeInTheDocument();
    expect(component.getByText(planetData.climate, { exact: false })).toBeInTheDocument();
    expect(component.getByText(planetData.terrain, { exact: false })).toBeInTheDocument();
  });

  test("should remove planet when remove btn is clicked", async () => {
    const component = factoryComponent();
    const removePlanetBtn = component.getByRole("button", { name: /Remove/ });
    fireEvent.click(removePlanetBtn);

    expect(history.location.pathname).toBe("/");
    await waitFor(() => {
      expect(component.getByText(`Success! Planet ${planetData.name} was removed from our system.`));
    });
  });

  test("should render a link to edit planet", () => {
    const component = factoryComponent();
    const editPlanetLink = component.getByRole("link", { name: /Edit/ });

    expect(editPlanetLink.getAttribute("href")).toContain("/11/edit");
  });

  test("should render residents", async () => {
    const component = factoryComponent();

    await waitFor(() => {
      expect(component.getByText("Poggle the Lesser - male")).toBeInTheDocument();
    });
  });

  test("should render 'there are no residents' if there are 0 residents", () => {
    usePlanetsStore.setState(
      (state) => ({
        ...state,
        planets: [{ ...planetData, residents: [] }]
      }),
      true
    );
    useResidentsStore.setState({});

    const component = factoryComponent();

    expect(component.getByText(/There are no residents in this planet/));
  });
});
