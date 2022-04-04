import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../test-utils/testing-library-utils";
import ScoopOptions from "../ScoopOptions";

test("inputs are red when invalid data entered", () => {
  render(<ScoopOptions name="" imagePath="" updateItemCount={jest.fn()} />);

  const vanillaInput = screen.getByRole("spinbutton");
  //with negative number
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "-1");
  expect(vanillaInput).toHaveClass("is-invalid");

  //with float
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "2.5");
  expect(vanillaInput).toHaveClass("is-invalid");

  //with out of range
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "5");
  expect(vanillaInput).toHaveClass("is-invalid");

  // with valid
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "2");
  expect(vanillaInput).not.toHaveClass("is-invalid");
});
