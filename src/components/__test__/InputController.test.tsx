import { describe, expect, test, vi } from "vitest";
import { render } from "../../test-utils";
import { act, fireEvent, waitFor } from "@testing-library/react";
import type { InputControllerProps } from "../InputController";
import { InputController } from "../InputController";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";
type DefaultProps = Omit<InputControllerProps<FieldValues>, "control">;

describe("<InputController/>", () => {
  const defaultProps: DefaultProps = {
    placeholder: "Name",
    rules: { required: "This field is required" },
    id: "name",
    label: "Name"
  };

  let form: UseFormReturn;
  const RenderWithForm = (props: DefaultProps) => {
    const localForm = useForm({
      mode: "onChange",
      criteriaMode: "all"
    });
    form = localForm;
    const { control } = localForm;

    return <InputController control={control} {...props} />;
  };

  const factoryComponent = (props: DefaultProps = defaultProps) => {
    return render(<RenderWithForm {...props} />);
  };

  test("should render correctly", () => {
    const component = factoryComponent();
    const input = component.getByTestId("name");
    expect(input).toBeInTheDocument();
    expect(input).toHaveProperty("placeholder", defaultProps.placeholder);
    expect(component).toMatchSnapshot();
  });

  test("should show error", async () => {
    const component = factoryComponent();
    const input = component.getByTestId("name");

    act(() => {
      fireEvent.change(input, { target: { value: "Alex" } });
    });
    act(() => {
      fireEvent.change(input, { target: { value: "" } });
    });

    await waitFor(() => {
      expect(component.getByText("This field is required")).toBeInTheDocument();
    });

    expect(component).toMatchSnapshot("Invalid");
  });

  test("enables to set errors from outside", async () => {
    const component = factoryComponent();

    act(() => {
      form.setError("name", { type: "invalidName" });
    });

    await waitFor(() => {
      expect(component.getByTestId("name")).toBeInvalid();
    });
  });

  test("should fire custom onChange", async () => {
    const onChange = vi.fn();
    const component = factoryComponent({ ...defaultProps, onChange });
    const inputField = component.getByTestId("name");
    act(() => {
      fireEvent.change(inputField, { target: { value: "Alex" } });
    });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
    });
  });

  test("should fire custom onBlur", async () => {
    const onBlur = vi.fn();
    const component = factoryComponent({ ...defaultProps, onBlur });
    const inputField = component.getByTestId("name");
    act(() => {
      fireEvent.change(inputField, { target: { value: "Alex" } });
      fireEvent.blur(inputField);
    });

    await waitFor(() => {
      expect(onBlur).toHaveBeenCalled();
    });
  });
});
