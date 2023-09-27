import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import axios from "axios";
import HomeAdmin from "./HomeAdmin";
jest.mock("axios");
describe("HomeAdmin", () => {
  test("renders generate template button", () => {
    render(<HomeAdmin />);
    const buttonElement = screen.getByText(/Generate Template/i);
    expect(buttonElement).toBeInTheDocument();
  });
  test("renders generate program button", () => {
    render(<HomeAdmin />);
    const buttonElement = screen.getByText(/Generate Program/i);
    expect(buttonElement).toBeInTheDocument();
  });
  test("clicking generate template button sets isGenerateTemplate to true", () => {
    render(<HomeAdmin />);
    const buttonElement = screen.getByText(/Generate Template/i);
    fireEvent.click(buttonElement);
    expect(
      screen.getByTestId("dynamic-form-generate-template")
    ).toBeInTheDocument();
  });
  test("clicking generate program button sets isGenerateProgram to true", () => {
    render(<HomeAdmin />);
    const buttonElement = screen.getByText(/Generate Program/i);
    fireEvent.click(buttonElement);
    expect(
      screen.getByTestId("dynamic-form-generate-program")
    ).toBeInTheDocument();
  });
  test("clicking on a user row calls handleUserRecordsData function", () => {
    render(
      <HomeAdmin
        users={[{ id: 1, username: "user1", email: "user1@example.com" }]}
      />
    );
    const userRowElement = screen.getByText(/user1/i);
    fireEvent.click(userRowElement);
    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:8080/api/records/1"
    );
  });
});
