import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Table } from ".";
import { User } from "../../types";
const mockPageChange = jest.fn();
const clientMutation = jest.fn();

const renderRegistrationForm = (users: User[]) => {
  render(
    <MemoryRouter>
      <Table
        data={users}
        totalCount={10}
        totalPages={2}
        pageSize={5}
        pageIndex={1}
        onPageChange={mockPageChange}
        clientsMutation={clientMutation}
      />
    </MemoryRouter>
  );
};

describe("UsersTable", () => {
  it("should render UsersTable component", () => {
    renderRegistrationForm(USERS);

    expect(screen.getByTestId("clients-table")).toBeInTheDocument();
  });

  it("should render users infos", () => {
    renderRegistrationForm(USERS);

    expect(screen.getByText(/fernando lopes/i)).toBeInTheDocument();
  });

  it("should render all users", () => {
    renderRegistrationForm(USERS);

    const rows = screen.getAllByRole("row");

    expect(rows.length).toBe(USERS.length + 1);
  });

  it("should show empty array message if there are no clients", () => {
    renderRegistrationForm([]);

    expect(screen.getByText(/No clients..../i)).toBeInTheDocument();
  });
});

const USERS: User[] = [
  {
    id: "id",
    name: "Fernando Lopes",
    cpf: "08875457425",
    birthdate: "1992-06-13",
    phone: "",
  },
  {
    id: "id1",
    name: "Fernando Cruz",
    cpf: "08875457425",
    birthdate: "1992-06-13",
    phone: "",
  },
  {
    id: "id2",
    name: "Fernando Agra",
    cpf: "08875457425",
    birthdate: "1992-06-13",
    phone: "",
  },
];
