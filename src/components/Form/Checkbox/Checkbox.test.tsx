import { render, screen } from "@testing-library/react";
import { Checkbox } from ".";
import userEvent from "@testing-library/user-event";

describe("Input", () => {
  it("should render Input component", () => {
    render(<Checkbox />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should change value on type", async () => {
    render(<Checkbox defaultValue="Hello," />);
    const input = screen.getByRole("textbox");

    await userEvent.type(input, " World!");

    expect(input).toHaveValue("Hello, World!");
  });
});
