import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

describe("initial settings are respected", () => {
  test("checkbox is unchecked", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: "I agree to Terms and Conditions",
    });
    expect(checkbox).not.toBeChecked();
  });
});

describe("checkbox acts as expected", () => {
  test("checkbox enbles button when checked", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: "I agree to Terms and Conditions",
    });
    userEvent.click(checkbox);
    const button = screen.getByRole("button", { name: "Confirm order" });
    expect(button).toBeEnabled();
  });

  test("checkox disables button when unchecked", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: "I agree to Terms and Conditions",
    });
    userEvent.click(checkbox);
    const button = screen.getByRole("button", { name: "Confirm order" });
    userEvent.click(checkbox);
    expect(button).toBeDisabled();
  });
});

test("popover responds to hover", async () => {
  render(<SummaryForm />);
  //popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();
  //popover appears upon mouseover of checkbox  label
  const termsAndConditions = screen.getByText(/Terms and Conditions/i);
  userEvent.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  //popover disappears when we mouse out

  userEvent.unhover(termsAndConditions);
  //popover disappearance is happening asynchronously
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
