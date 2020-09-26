import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CustomerForm from "./CustomerForm";
import store from "../../app/store";
import { Provider } from "react-redux";

// @TODO actually mock the store.
const StoreMockedCustomerForm = () => (
  <Provider store={store}>
    <CustomerForm />
  </Provider>
);

test("renders the form", () => {
  const { getByText } = render(<StoreMockedCustomerForm />);
  const headerElement = getByText(/Add Customer/i);
  expect(headerElement).toBeInTheDocument();
});

it("Handles correct values", async () => {
  const { container, queryByText } = render(<StoreMockedCustomerForm />);
  const firstName = container.querySelector('input[name="firstName"]');
  const lastName = container.querySelector('input[name="lastName"]');
  const dateOfBirth = container.querySelector('input[name="dateOfBirth"]');

  userEvent.type(firstName, "Steve");
  expect(firstName).toHaveValue("Steve");
  const firstNameErrElement = queryByText(/First name is required/i);
  expect(firstNameErrElement).toBeNull();

  userEvent.type(lastName, "McMahon");
  expect(lastName).toHaveValue("McMahon");
  const lastNameErrElement = queryByText(/Last name is required/i);
  expect(lastNameErrElement).toBeNull();

  // @TODO Research why the userEvent doesn't work here. It's marked fixed:
  // https://github.com/testing-library/user-event/pull/400
  // First revelvant google result:
  // https://github.com/testing-library/user-event/issues/399
  await waitFor(() => {
    fireEvent.change(dateOfBirth, {
      target: {
        value: "2000-01-01",
      },
    });
    fireEvent.blur(dateOfBirth);
  });
  expect(dateOfBirth).toHaveValue("2000-01-01");
  const dateOfBirthErrElement = queryByText(/Birthday is required/i);
  expect(dateOfBirthErrElement).toBeNull();
});

it("Handles empty values", async () => {
  const { container, queryByText } = render(<StoreMockedCustomerForm />);
  const firstName = container.querySelector('input[name="firstName"]');
  const lastName = container.querySelector('input[name="lastName"]');
  const dateOfBirth = container.querySelector('input[name="dateOfBirth"]');

  userEvent.clear(firstName);
  await waitFor(() => {
    fireEvent.blur(firstName);
  });
  expect(firstName).toHaveAttribute("value", "");
  const firstNameErrElement = queryByText(/First name is required/i);
  expect(firstNameErrElement).toBeInTheDocument();

  userEvent.type(lastName, "");
  await waitFor(() => {
    fireEvent.blur(lastName);
  });
  const lastNameErrElement = queryByText(/Last name is required/i);
  expect(lastNameErrElement).toBeInTheDocument();

  // @TODO Research why the userEvent doesn't work here. It's marked fixed:
  // https://github.com/testing-library/user-event/pull/400
  // First revelvant google result:
  // https://github.com/testing-library/user-event/issues/399
  await waitFor(() => {
    fireEvent.change(dateOfBirth, {
      target: {
        value: "bad",
      },
    });
    fireEvent.blur(dateOfBirth);
  });
  const dateOfBirthErrElement = queryByText(/Birthday is required/i);
  expect(dateOfBirthErrElement).toBeInTheDocument();
});
