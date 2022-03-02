import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import Options from "../Options";

test("update scoop subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />);
  const scoopsTotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsTotal).toHaveTextContent("0.00");

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopsTotal).toHaveTextContent("2.00");

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsTotal).toHaveTextContent("6.00");
});

test("update topping subtototal when toppings change", async () => {
  render(<Options optionType="toppings" />);
  const toppingsTotal = screen.getByText("Toppings total: $", { exact: false });
  expect(toppingsTotal).toHaveTextContent("0.00");

  const cherryCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.clear(cherryCheckbox);
  userEvent.click(cherryCheckbox);
  expect(toppingsTotal).toHaveTextContent("1.50");
});
