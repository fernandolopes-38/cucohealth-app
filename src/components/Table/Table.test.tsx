import { render, screen } from "@testing-library/react";
import { Table } from ".";
import { User } from "../../types";

const renderRegistrationForm = (users: User[]) => {
  render(<Table data={users} />);
};

describe("UsersTable", () => {
  it("should render UsersTable component", () => {
    renderRegistrationForm([]);

    expect(screen.getByTestId("clients-table")).toBeInTheDocument();
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
