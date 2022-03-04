import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

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

describe("grand total", () => {
  // test("grand total starts at $0.00", () => {
  //   render(<OrderEntry />);
  //   const grandTotal = screen.findByRole("heading", {
  //     name: /grand total: \$/i,
  //   });
  //   expect(grandTotal).toHaveTextContent("0.00");
  // }); //test moved to next because throws error
  test("grand total updates properly if scoop is added first", async () => {
    render(<OrderEntry />);
    const grandTotal = await screen.findByRole("heading", {
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent("0.00");
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");

    expect(grandTotal).toHaveTextContent("2.00");
  });

  test("grand total updates properly if topping is added first", async () => {
    render(<OrderEntry />);

    const cherryCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    //TODO add scoop
    userEvent.clear(cherryCheckbox);
    userEvent.click(cherryCheckbox);
    const grandTotal = await screen.findByRole("heading", {
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent("1.50");
  });

  test("grand total updates properly if item is removed", async () => {
    render(<OrderEntry />);

    const cherryCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.clear(cherryCheckbox);
    userEvent.click(cherryCheckbox);
    userEvent.click(cherryCheckbox);
    const grandTotal = await screen.findByRole("heading", {
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent("0.00");
  });
});
