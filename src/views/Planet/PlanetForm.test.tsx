import { describe, expect, test, vi } from "vitest";
import { render } from "../../test-utils";
import type { RenderResult } from "@testing-library/react";
import { act, fireEvent, waitFor } from "@testing-library/react";
import type { PlanetFormProps } from "./PlanetForm";
import { PlanetForm } from "./PlanetForm";
import { FormProvider, useForm } from "react-hook-form";

describe("<PlanetForm/>", () => {
  const defaultProps = {
    onSubmit: vi.fn(),
    confirmText: "Create"
  };

  const Component = (props: PlanetFormProps) => {
    const form = useForm();
    return (
      <FormProvider {...form}>
        <PlanetForm {...props} />
      </FormProvider>
    );
  };
  const factoryComponent = (props: PlanetFormProps = defaultProps) => {
    return render(<Component {...props} />);
  };

  const fillForm = (component: RenderResult) => {
    act(() => {
      fireEvent.change(component.getByRole("textbox", { name: "Name" }), { target: { value: "Alex" } });
      fireEvent.change(component.getByRole("textbox", { name: "Climate" }), { target: { value: "Hot" } });
      fireEvent.change(component.getByRole("spinbutton", { name: "Population" }), { target: { value: "1000" } });
      fireEvent.change(component.getByRole("textbox", { name: "Terrain" }), { target: { value: "Terrain" } });
      fireEvent.change(component.getByRole("spinbutton", { name: "Diameter (km)" }), { target: { value: "150" } });
    });
  };

  test("should render succesfully", () => {
    const component = factoryComponent();

    expect(component).toMatchSnapshot();
  });

  test("should render elements correctly", () => {
    const component = factoryComponent();

    expect(component.getByRole("textbox", { name: "Name" })).toBeInTheDocument();
    expect(component.getByRole("textbox", { name: "Climate" })).toBeInTheDocument();
    expect(component.getByRole("spinbutton", { name: "Population" })).toBeInTheDocument();
    expect(component.getByRole("textbox", { name: "Terrain" })).toBeInTheDocument();
    expect(component.getByRole("spinbutton", { name: "Diameter (km)" })).toBeInTheDocument();
  });

  test("confirm btn should be disabled until form is filled correctly", async () => {
    const component = factoryComponent();

    expect(component.getByRole("button", { name: /Create/ })).toBeDisabled();

    fillForm(component);

    await waitFor(() => {
      expect(component.getByRole("button", { name: /Create/ })).toBeEnabled();
    });
  });

  test("should fire onSubmit when confirm btn is clicked", async () => {
    const component = factoryComponent();

    const confirmBtn = component.getByRole("button", { name: /Create/ });

    fillForm(component);

    await waitFor(() => {
      expect(component.getByRole("button", { name: /Create/ })).toBeEnabled();
    });

    fireEvent.click(confirmBtn);

    expect(defaultProps.onSubmit).toHaveBeenCalled();
  });

  test("should have custom button text if confirmText is passed", async () => {
    const component = factoryComponent({ ...defaultProps, confirmText: "Edit" });

    expect(component.getByRole("button", { name: /Edit/ })).toBeInTheDocument();
  });
});
