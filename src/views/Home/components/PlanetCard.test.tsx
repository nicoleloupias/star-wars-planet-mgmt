import { describe, expect, test } from "vitest";
import { render } from "../../../test-utils";
import { PlanetCard, PlanetCardProps } from "./PlanetCard";

describe("<PlanetCard/>", () => {
  const defaultProps = {
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
  };
  const factoryComponent = (props: PlanetCardProps = defaultProps) => render(<PlanetCard {...props} />);

  test("should render succesfully", () => {
    const component = factoryComponent();

    expect(component).toMatchSnapshot();
    expect(component.getByTestId("planet-card")).toBeInTheDocument();
  });

  test("should render correctly with default props", () => {
    const component = factoryComponent();

    expect(component.getByText(defaultProps.name)).toBeInTheDocument();
  });

  test("should render correctly with given props", () => {
    const component = factoryComponent({ ...defaultProps, name: "Example" });

    expect(component.getByText("Example")).toBeInTheDocument();
  });

  test("card should be rendered as link", () => {
    const component = factoryComponent({ ...defaultProps, name: "Example" });

    expect(component.getByRole("link")).toBeInTheDocument();
    expect(component.getByRole("link").getAttribute("href")).toBe(`/${defaultProps.id}`);
  });
});
