import { describe, expect, test } from "vitest";
import { render } from "../../../test-utils";
import type { RenderResult } from "@testing-library/react";
import { act, fireEvent, waitFor } from "@testing-library/react";
import { CreatePlanet } from "./CreatePlanet";
import { usePlanetsStore } from "../../../hooks/usePlanetsStore";
import { createMemoryHistory } from "history";

describe("<CreatePlanet/>", () => {
  const history = createMemoryHistory({
    initialEntries: ["/create"]
  });
  const factoryComponent = () => {
    return render(<CreatePlanet />, { history });
  };

  const fillForm = (component: RenderResult) => {
    act(() => {
      fireEvent.change(component.getByRole("textbox", { name: "Name" }), { target: { value: "Cool planet" } });
      fireEvent.change(component.getByRole("textbox", { name: "Climate" }), { target: { value: "Hot" } });
      fireEvent.change(component.getByRole("spinbutton", { name: "Habitants" }), { target: { value: "1000" } });
      fireEvent.change(component.getByRole("textbox", { name: "Terrain" }), { target: { value: "Terrain" } });
      fireEvent.change(component.getByRole("spinbutton", { name: "Diameter (km)" }), { target: { value: "150" } });
    });
  };

  test("should render succesfully", () => {
    const component = factoryComponent();

    expect(component).toMatchSnapshot();
  });

  test("should create planet correctly", async () => {
    const component = factoryComponent();
    fillForm(component);

    await waitFor(() => {
      expect(component.getByRole("button", { name: /Create/ })).toBeEnabled();
    });

    expect(history.location.pathname).toBe("/create");

    fireEvent.click(component.getByRole("button", { name: /Create/ }));

    await waitFor(() => {
      expect(usePlanetsStore.getState().planets?.length).toBe(1);
      expect(usePlanetsStore.getState().planets?.[0].name).toBe("Cool planet");
      expect(history.location.pathname).toBe("/");
      expect(component.getByText("Success! Planet Cool planet was added to our system.")).toBeInTheDocument();
    });
  });
});
