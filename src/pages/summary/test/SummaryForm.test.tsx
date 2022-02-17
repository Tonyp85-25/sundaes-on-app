import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

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
    fireEvent.click(checkbox);
    const button = screen.getByRole("button", { name: "Confirm order" });
    expect(button).toBeEnabled();
  });

  test("checkox disables button when unchecked", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: "I agree to Terms and Conditions",
    });
    fireEvent.click(checkbox);
    const button = screen.getByRole("button", { name: "Confirm order" });
    fireEvent.click(checkbox);
    expect(button).toBeDisabled();
  });
});
