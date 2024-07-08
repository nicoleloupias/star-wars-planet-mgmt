import { beforeAll, describe, expect, test, vi } from "vitest";
import { render } from "../../../test-utils";
import { SearchBar } from "./SearchBar";
import { useForm } from "react-hook-form";
import { FormFieldValues } from "../Home";
import { usePlanetsStore } from "../../../hooks/usePlanetsStore";
import { fireEvent, waitFor } from "@testing-library/dom";
import { act } from "@testing-library/react";

describe("<SearchBar/>", () => {
  const setPlanetsToShow = vi.fn();
  const RenderWithForm = () => {
    const localForm = useForm<FormFieldValues>({
      mode: "onChange",
      criteriaMode: "all"
    });

    return <SearchBar form={localForm} setPlanetsToShow={setPlanetsToShow} />;
  };
  const factoryComponent = () => render(<RenderWithForm />);

  beforeAll(() => {
    usePlanetsStore.setState(
      {
        planets: [
          {
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
          },
          {
            id: "12",
            name: "Utapau",
            rotation_period: "27",
            orbital_period: "351",
            diameter: "12900",
            climate: "temperate, arid, windy",
            gravity: "1 standard",
            terrain: "scrublands, savanna, canyons, sinkholes",
            surface_water: "0.9",
            population: "95000000",
            residents: ["https://swapi.dev/api/people/83/"],
            films: ["https://swapi.dev/api/films/6/"],
            created: "2014-12-10T12:49:01.491000Z",
            edited: "2014-12-20T20:58:18.439000Z",
            url: "https://swapi.dev/api/planets/12/"
          }
        ]
      },

      true
    );
  });

  test("should render succesfully", () => {
    const component = factoryComponent();

    expect(component).toMatchSnapshot();
    expect(component.getByTestId("search")).toBeInTheDocument();
  });

  test("should search succesfully", async () => {
    const component = factoryComponent();

    act(() => {
      fireEvent.change(component.getByTestId("search"), { target: { value: "Geonosis" } });
      fireEvent.click(component.getByRole("button", { name: "Search" }));
    });

    await waitFor(() => {
      expect(setPlanetsToShow).toHaveBeenCalledWith([
        {
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
        }
      ]);
    });
  });
});
