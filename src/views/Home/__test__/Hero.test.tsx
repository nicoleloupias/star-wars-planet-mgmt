import { afterEach, describe, expect, test } from "vitest";
import { Home } from "..";
import { render } from "../../../test-utils";
import { cleanup } from "@testing-library/react";
import { Hero } from "../Hero";

describe("<Hero/>", () => {
  afterEach(cleanup);

  test("should render succesfully", () => {
    const component = render(<Hero />);

    expect(component).toMatchSnapshot();
  });

  test("should render elements correctly", () => {
    const component = render(<Hero />);

    expect(component.getByText(/Explore the galaxy/)).toBeInTheDocument();
    expect(component.getByText(/Scroll/)).toBeInTheDocument();
    expect(component.getByRole("img")).toHaveAttribute("src", "/src/assets/Darth-Vader-PNG-HD-Image.png");
  });
});
