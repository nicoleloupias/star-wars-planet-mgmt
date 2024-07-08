import { beforeAll, describe, expect, test, vi } from "vitest";
import { render } from "../../../test-utils";
import { SortBy } from "./SortBy";
import { useForm } from "react-hook-form";
import { FormFieldValues } from "../Home";
import { fireEvent, waitFor } from "@testing-library/dom";
import { act } from "@testing-library/react";

describe("<SortBy/>", () => {
  const setPlanetsToShow = vi.fn();
  const RenderWithForm = () => {
    const localForm = useForm<FormFieldValues>({
      mode: "onChange",
      criteriaMode: "all"
    });

    return (
      <SortBy
        form={localForm}
        setPlanetsToShow={setPlanetsToShow}
        planetsToShow={[
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
        ]}
      />
    );
  };
  const factoryComponent = () => render(<RenderWithForm />);

  test("should render succesfully", () => {
    const component = factoryComponent();

    expect(component).toMatchSnapshot();
  });

  test("should sort by diameter succesfully", async () => {
    const component = factoryComponent();

    act(() => {
      fireEvent.change(component.getByRole("combobox"), { target: { value: "diameter" } });
    });

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
    ]);
  });

  // TODO: test all sort bys
});
