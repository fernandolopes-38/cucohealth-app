import { screen, render } from "@testing-library/react";
import { Button } from "./";
import userEvent from "@testing-library/user-event";

const buttonClick = jest.fn();

describe("Button", () => {
  it("should render Button component", () => {
    render(<Button>Texto</Button>);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should click Button component", async () => {
    render(<Button onClick={buttonClick}>Texto</Button>);

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(buttonClick).toHaveBeenCalledTimes(1);
  });

  it("should render loader when loadingt", async () => {
    render(
      <Button onClick={buttonClick} loading={true}>
        Texto
      </Button>
    );

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });
});
