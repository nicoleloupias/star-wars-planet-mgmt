import { describe, expect, test } from "vitest";
import { render } from "../../../test-utils";
import { Hero } from "./Hero";

describe("<Hero/>", () => {
  test("should render succesfully", () => {
    const component = render(<Hero />);

    expect(component).toMatchSnapshot();
  });

  test("should render elements correctly", () => {
    const component = render(<Hero />);

    expect(component.getByText(/Explore the galaxy/)).toBeInTheDocument();
    expect(component.getByText(/Scroll/)).toBeInTheDocument();
  });
});
