import { render, screen } from "@testing-library/react";
import { Checkbox } from ".";
import userEvent from "@testing-library/user-event";

describe("Input", () => {
  it("should render Input component", () => {
    render(<Checkbox />);

    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("should change checked value on click", async () => {
    render(<Checkbox />);
    const input = screen.getByRole("checkbox");

    await userEvent.click(input);

    expect(input).toBeChecked();
  });
});
