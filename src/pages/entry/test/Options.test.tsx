import { render, screen } from "../../../test-utils/testing-library-utils";
import { ReactElement } from "react";
import { act } from "react-dom/test-utils";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import Options from "../Options";
import userEvent from "@testing-library/user-event";

test("displays image for each scoop option from the server", async () => {
  render(<Options optionType="scoops" />);

  const scoopImages = (await screen.findAllByRole("img", {
    name: /scoop$/i,
  })) as HTMLImageElement[];
  expect(scoopImages).toHaveLength(2);

  const altText = scoopImages.map((element: HTMLImageElement) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("displays image for each topping option from the server", async () => {
  render(<Options optionType="toppings" />, {});

  const toppingImages = (await screen.findAllByRole("img", {
    name: /topping$/i,
  })) as HTMLImageElement[];
  expect(toppingImages).toHaveLength(3);

  const altText = toppingImages.map((element) => element.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
test("no scoop subtotal update if invalid count", async () => {
  render(<Options optionType="scoops" />);
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "-1");
  let scoopsSubTotal = await screen.getByText("Scoops total: $0.00");
  expect(scoopsSubTotal).toBeInTheDocument();

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1.5");
  expect(scoopsSubTotal).toBeInTheDocument();

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "10");
  expect(scoopsSubTotal).toBeInTheDocument();

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "2");
  scoopsSubTotal = await screen.getByText("Scoops total: $4.00");
  expect(scoopsSubTotal).toBeInTheDocument();
});
